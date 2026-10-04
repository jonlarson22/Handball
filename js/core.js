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
