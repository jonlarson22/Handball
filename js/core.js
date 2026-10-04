/* Handball — shared core (Phase 1 merge).
   Owns: Firebase init, `db`, `isAdmin` + auth state, top-level view switching. */
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

/* Shared player store (Phase 2 hardening): exactly one players listener for
   both halves. Firebase stores arrays as numeric-keyed objects, so every
   subscriber always gets a real array with stable ids. */
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

let isAdmin = false;

function switchView(name) {
    const views = { rankings: 'view-rankings', tournaments: 'view-tournaments' };
    for (const key in views) {
        const section = document.getElementById(views[key]);
        if (section) section.hidden = (key !== name);
        const tab = document.getElementById('apptab-' + key);
        if (tab) tab.classList.toggle('active', key === name);
    }
    window.scrollTo(0, 0);
}

firebase.auth().onAuthStateChanged((user) => {
    isAdmin = !!user;
    document.body.classList.toggle('admin-mode', isAdmin);
    // rankings half
    if (typeof render === 'function') {
        render();
        if (isAdmin && typeof renderQueue === 'function') renderQueue();
    }
    // tournaments half
    if (typeof updateTournamentAuthUI === 'function') updateTournamentAuthUI();
});
