const LIGA_DB = {
    sabado: [
        { lugar: "Cancha Principal", hora: "09:00 AM", local: "VIEJOS LOBOS", visita: "EAGLES", cat: "Veteranos" },
        { lugar: "Cancha 2", hora: "10:30 AM", local: "LINKERS B", visita: "BRUINS", cat: "Varonil B" }
    ],
    domingo: [
        { lugar: "Cancha Principal", hora: "07:45 AM", local: "TITANES", visita: "AZTECAS", cat: "Varonil Libre" }
    ],
    sanciones: [
        { nombre: "Carlos R. (Bruins)", motivo: "Falta Técnica Art. 47", castigo: "1 Partido", status: "Pendiente" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Manejo de navegación
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-section');

            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            
            if (target === 'sabado' || target === 'domingo') {
                renderGames(target);
                document.getElementById('partidos-view').classList.add('active');
            } else {
                document.getElementById(target).classList.add('active');
            }
        });
    });

    renderSanciones();
});

function renderGames(dia) {
    const container = document.getElementById('games-container');
    const title = document.getElementById('view-title');
    title.innerText = `ROL DE JUEGOS - ${dia.toUpperCase()}`;
    container.innerHTML = '';

    LIGA_DB[dia].forEach(g => {
        container.innerHTML += `
            <div class="news-item" style="border-left: 6px solid var(--orange)">
                <div style="display:flex; justify-content: space-between; font-weight:bold; font-size:0.8rem; color:#666">
                    <span>${g.lugar}</span>
                    <span>${g.hora}</span>
                </div>
                <div style="text-align:center; padding:15px 0; font-size:1.2rem; font-weight:bold">
                    ${g.local} <span style="color:var(--orange)">VS</span> ${g.visita}
                </div>
                <div style="text-align:center; font-size:0.8rem; color:var(--orange)">${g.cat}</div>
            </div>
        `;
    });
}

function renderSanciones() {
    const list = document.getElementById('sanciones-list');
    LIGA_DB.sanciones.forEach(s => {
        list.innerHTML += `
            <tr>
                <td><strong>${s.nombre}</strong></td>
                <td>${s.motivo}</td>
                <td>${s.castigo}</td>
                <td style="color:red; font-weight:bold">${s.status}</td>
            </tr>
        `;
    });
}

function navigateTo(section) {
    document.querySelector(`[data-section="${section}"]`).click();
}
