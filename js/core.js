/* Handball — shared core (Phase 3 rebuild).
   Owns: Firebase init, shared player store, auth + roles, top-level navigation. */
const firebaseConfig = {
  apiKey: "AIzaSyCCV_WHA1Q7WKawfG68Y9z40xINVg5zbmw",
  authDomain: "utah-handball.firebaseapp.com",
  databaseURL: "https://utah-handball-default-rtdb.firebaseio.com",
  projectId: "utah-handball",
  storageBucket: "utah-handball.firebasestorage.app",
  messagingSenderId: "4109545863",
  appId: "1:4109545863:web:6a6de7f532be0bc20f2322"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* ---------- shared player store ----------
   Exactly one players listener for the whole app. Firebase stores arrays as
   numeric-keyed objects, so every subscriber always gets a real array with
   stable ids. */
function normalizePlayers(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return Object.keys(val).sort((a, b) => (+a) - (+b)).map(k => {
        const p = val[k];
        if (p && typeof p === 'object' && (p.id === undefined || p.id === null)) {
            p.id = isNaN(+k) ? k : +k;
        }
        return p;
    });
}
let clubPlayers = [];
const playersSubscribers = [];
function onPlayersUpdate(fn) { playersSubscribers.push(fn); }
db.ref('players').on('value', (snap) => {
    clubPlayers = normalizePlayers(snap.val());
    playersSubscribers.forEach(fn => { try { fn(clubPlayers); } catch (e) { console.error('players subscriber failed:', e); } });
});

/* ---------- roles & auth ----------
   Roles live in /admins/{uid} = { email, role, createdAt }.
   owner: everything, incl. managing roles.  admin: everything except roles.
   director: tournament tools only. */
let currentUser = null;
let userRole = null;   // 'owner' | 'admin' | 'director' | null
let isAdmin = false;   // logged in AND holding a role (legacy flag kept for old call sites)

function can(perm) {
    if (!isAdmin || !userRole) return false;
    switch (perm) {
        case 'admin':       return true;  // any role may open the Admin tab
        case 'review':
        case 'players':
        case 'data':        return userRole === 'owner' || userRole === 'admin';
        case 'tournaments': return true;   // owner, admin, director
        case 'roles':       return userRole === 'owner';
        default:            return false;
    }
}

/* ---------- connection status (green = live, red = failed) ---------- */
function setConnectionStatus(ok) {
    const el = document.getElementById('connection-status');
    if (!el) return;
    el.innerText = ok ? 'Realtime Connected ✅' : 'Connection Failed';
    el.style.color = ok ? '#2ecc71' : '#e74c3c';
}

/* ---------- navigation ---------- */
function switchScreen(name) {
    document.querySelectorAll('#app-tabs .app-tab').forEach(t =>
        t.classList.toggle('active', t.dataset.screen === name));
    document.querySelectorAll('.screen').forEach(s => {
        s.hidden = (s.id !== 'screen-' + name);
    });
    window.scrollTo(0, 0);
}
document.querySelectorAll('#app-tabs .app-tab').forEach(t =>
    t.addEventListener('click', () => switchScreen(t.dataset.screen)));

let activeAdminTab = 'review';
const ADMIN_TABS = ['review', 'players', 'tournaments', 'data', 'roles'];
const ADMIN_GATES = { review: 'review', players: 'players', tournaments: 'tournaments', data: 'data', roles: 'roles' };

function switchAdminTab(name) {
    if (!name || !can(ADMIN_GATES[name])) return;
    activeAdminTab = name;
    applyAdminTabVisibility();
    window.scrollTo(0, 0);
}

function applyAdminTabVisibility() {
    const loggedOut = !currentUser;
    const noRole = currentUser && !isAdmin;

    const subtabs = document.getElementById('admin-subtabs');
    if (subtabs) subtabs.hidden = loggedOut || noRole;
    document.querySelectorAll('#admin-subtabs .admin-subtab').forEach(t => {
        t.hidden = !can(ADMIN_GATES[t.dataset.astab]);
        t.classList.toggle('active', t.dataset.astab === activeAdminTab);
    });

    // keep the active tab on something the user may actually see
    if (isAdmin && !can(ADMIN_GATES[activeAdminTab])) {
        const first = ADMIN_TABS.find(n => can(ADMIN_GATES[n]));
        if (first) activeAdminTab = first;
    }

    ADMIN_TABS.forEach(n => {
        const el = document.getElementById('admin-' + n);
        if (!el) return;
        let visible;
        if (loggedOut) visible = false;
        else if (!isAdmin) visible = (n === 'roles');  // request-access lives here
        else visible = (n === activeAdminTab);
        el.hidden = !visible;
    });

    const managePanel = document.getElementById('roles-manage-panel');
    if (managePanel) managePanel.hidden = !!noRole;
    const reqPanel = document.getElementById('request-access-panel');
    if (reqPanel) reqPanel.hidden = !noRole;
}
document.querySelectorAll('#admin-subtabs .admin-subtab').forEach(t =>
    t.addEventListener('click', () => switchAdminTab(t.dataset.astab)));

function goToPublicBracket() { switchScreen('tournaments'); }
function goToAdminTournaments() { switchScreen('admin'); switchAdminTab('tournaments'); }
// legacy alias (old inline handlers)
function switchView(name) { switchScreen(name === 'rankings' ? 'leaderboard' : name); }

/* ---------- auth UI ---------- */
function refreshAuthUI() {
    document.body.classList.toggle('admin-mode', isAdmin);

    const loggedOut = !currentUser;
    const noRole = currentUser && !isAdmin;

    const loginPanel = document.getElementById('admin-login-panel');
    if (loginPanel) loginPanel.hidden = !loggedOut;
    const userRow = document.getElementById('admin-user-row');
    if (userRow) {
        userRow.hidden = loggedOut;
        const emailEl = document.getElementById('admin-user-email');
        if (emailEl && currentUser) emailEl.textContent = currentUser.email || '';
    }

    applyAdminTabVisibility();

    if (typeof updateTournamentAuthUI === 'function') updateTournamentAuthUI();
    if (typeof render === 'function') {
        render();
        if (isAdmin && typeof renderQueue === 'function') renderQueue();
    }
    if (typeof renderRoles === 'function') renderRoles();
}

function loadRoleAndFinish(user) {
    db.ref('admins/' + user.uid).once('value').then(snap => {
        const rec = snap.val();
        if (rec && rec.role) {
            userRole = rec.role;
            isAdmin = true;
            refreshAuthUI();
        } else {
            // bootstrap: the very first admin login becomes the owner
            return db.ref('admins').once('value').then(all => {
                if (!all.exists()) {
                    return db.ref('admins/' + user.uid).set({
                        email: user.email || '', role: 'owner', createdAt: Date.now()
                    }).then(() => {
                        userRole = 'owner';
                        isAdmin = true;
                        if (typeof showToast === 'function') showToast('Welcome — you are the club owner.');
                        refreshAuthUI();
                    });
                }
                userRole = null;
                isAdmin = false;
                refreshAuthUI();
            });
        }
    }).catch(e => {
        console.error('role load failed:', e);
        userRole = null;
        isAdmin = false;
        refreshAuthUI();
    });
}

firebase.auth().onAuthStateChanged((user) => {
    currentUser = user || null;
    if (!user) {
        userRole = null;
        isAdmin = false;
        // don't strand the user on a hidden admin screen
        const adminScreen = document.getElementById('screen-admin');
        if (adminScreen && !adminScreen.hidden) switchScreen('leaderboard');
        refreshAuthUI();
        return;
    }
    loadRoleAndFinish(user);
});

/* ---------- login / logout (Admin screen) ---------- */
function loginAdmin() {
    const emailEl = document.getElementById('admin-email');
    const pwdEl = document.getElementById('admin-pwd');
    const email = emailEl ? emailEl.value : '';
    const pwd = pwdEl ? pwdEl.value : '';
    firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then(() => { if (pwdEl) pwdEl.value = ''; })
        .catch((error) => alert('Login failed: ' + error.message));
}
function logoutUser() {
    firebase.auth().signOut().catch(e => alert('Logout failed: ' + e.message));
}

/* ---------- access requests & role management (owner) ---------- */
function requestAdminAccess() {
    if (!currentUser) return;
    db.ref('adminRequests/' + currentUser.uid).set({
        email: currentUser.email || '', requestedAt: Date.now()
    }).then(() => {
        if (typeof showToast === 'function') showToast('Request sent to the club owner.');
    }).catch(e => alert('Request failed: ' + e.message));
}

function renderRoles() {
    if (!can('roles')) return;
    const listEl = document.getElementById('roles-list');
    const reqEl = document.getElementById('access-requests');
    if (!listEl || !reqEl) return;

    db.ref('admins').once('value').then(snap => {
        const admins = snap.val() || {};
        const uids = Object.keys(admins);
        listEl.innerHTML = uids.length ? uids.map(uid => {
            const a = admins[uid];
            const self = currentUser && uid === currentUser.uid;
            const opts = ['owner', 'admin', 'director'].map(r =>
                `<option value="${r}"${a.role === r ? ' selected' : ''}>${r}</option>`).join('');
            return `<div class="role-row">
                <span class="role-email">${a.email || uid}</span>
                <select onchange="setUserRole('${uid}', this.value)"${self ? ' disabled' : ''}>${opts}</select>
                ${self ? '<span class="muted">(you)</span>' : '<button class="uha-btn-outline btn-sm" onclick="removeUserRole(\'' + uid + '\')">Remove</button>'}
            </div>`;
        }).join('') : '<p class="muted">No admins yet.</p>';
    }).catch(e => console.error(e));

    db.ref('adminRequests').once('value').then(snap => {
        const reqs = snap.val() || {};
        const uids = Object.keys(reqs);
        reqEl.innerHTML = uids.length ? uids.map(uid => {
            const r = reqs[uid];
            return `<div class="role-row">
                <span class="role-email">${r.email || uid}</span>
                <span>
                    <button class="uha-btn-blue btn-sm" onclick="approveRequest('${uid}', 'director')">Director</button>
                    <button class="uha-btn-blue btn-sm" onclick="approveRequest('${uid}', 'admin')">Admin</button>
                    <button class="uha-btn-outline btn-sm" onclick="denyRequest('${uid}')">Deny</button>
                </span>
            </div>`;
        }).join('') : '<p class="muted">No pending requests.</p>';
    }).catch(e => console.error(e));
}

function setUserRole(uid, role) {
    if (!can('roles')) return;
    db.ref('admins/' + uid + '/role').set(role).then(renderRoles)
        .catch(e => alert('Failed: ' + e.message));
}
function removeUserRole(uid) {
    if (!can('roles')) return;
    if (!confirm('Remove this admin?')) return;
    db.ref('admins/' + uid).remove().then(renderRoles)
        .catch(e => alert('Failed: ' + e.message));
}
function approveRequest(uid, role) {
    if (!can('roles')) return;
    db.ref('adminRequests/' + uid).once('value').then(snap => {
        const r = snap.val() || {};
        return db.ref('admins/' + uid).set({
            email: r.email || '', role: role, createdAt: Date.now()
        }).then(() => db.ref('adminRequests/' + uid).remove());
    }).then(renderRoles).catch(e => alert('Failed: ' + e.message));
}
function denyRequest(uid) {
    if (!can('roles')) return;
    db.ref('adminRequests/' + uid).remove().then(renderRoles)
        .catch(e => alert('Failed: ' + e.message));
}
