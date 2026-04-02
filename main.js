/**
 * LIGA DE BASQUETBOL SIERRA JUÁREZ 
 * Versión Compacta con Agrupamiento por Cancha (7 a Central)
 */

const LIGA_DB = {
    sabado: generateGames(),
    domingo: generateGames(),
    sanciones: [
        { nombre: "Carlos R. (Bruins)", motivo: "Falta Técnica Art. 47", castigo: "1 Partido", status: "Pendiente", cat: "Varonil B" },
        { nombre: "Luis M. (Viejos Lobos)", motivo: "Acumulación de amarillas", castigo: "2 Partidos", status: "Activa", cat: "Veteranos" },
        { nombre: "Equipo Linkers B", motivo: "Falta de pago Tesorería", castigo: "Suspensión", status: "Urgente", cat: "Varonil B" }
    ]
};

function generateGames() {
    const data = {};
    // Orden solicitado: del 7 al 1 y luego Central
    const canchas = ["Cancha Central", "Cancha 7", "Cancha 6", "Cancha 5", "Cancha 4", "Cancha 3", "Cancha 2", "Cancha 1"];
    const equipos = ["TITANES", "AZTECAS", "LOBOS", "EAGLES", "BRUINS", "LINKERS", "DRAGONES", "WARRIORS", "COBRAS", "REBELDES"];
    const tipos = ["CAMP", "PRACT", "OFICIAL"];
    const categorias = ["Varonil Libre", "Veteranos", "Juvenil", "Femenil"];

    canchas.forEach(cancha => {
        data[cancha] = [];
        for (let i = 0; i < 5; i++) {
            data[cancha].push({
                hora: `${7 + i}:45 AM`,
                local: equipos[Math.floor(Math.random() * equipos.length)],
                visita: equipos[Math.floor(Math.random() * equipos.length)],
                tipo: tipos[Math.floor(Math.random() * tipos.length)],
                cat: categorias[Math.floor(Math.random() * categorias.length)]
            });
        }
    });
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
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
                renderGamesByCancha(target);
                document.getElementById('partidos-view').classList.add('active');
            } else if (target === 'sanciones') {
                renderSancionesCards();
                document.getElementById('sanciones').classList.add('active');
            } else {
                document.getElementById(target).classList.add('active');
            }
        });
    });
});

function renderGamesByCancha(dia) {
    const container = document.getElementById('games-container');
    const title = document.getElementById('view-title');
    title.innerText = `ROL DE JUEGOS - ${dia.toUpperCase()}`;
    
    let htmlContent = '';
    const dataDia = LIGA_DB[dia];

    // Recorremos el objeto por cancha
    for (const cancha in dataDia) {
        // Agregamos el Subtítulo de la Cancha
        htmlContent += `<h3 class="cancha-title"><i class="fas fa-map-marker-alt"></i> ${cancha.toUpperCase()}</h3>`;
        
        dataDia[cancha].forEach(g => {
            htmlContent += `
                <div class="game-card-compact">
                    <div style="display:flex; justify-content: space-between; font-size:0.7rem; color:#888; margin-bottom:5px;">
                        <span>${g.hora}</span>
                        <span style="font-weight:bold; color:var(--orange)">${g.tipo}</span>
                    </div>
                    <div style="text-align:center; font-weight:700; font-size:0.95rem; margin: 5px 0;">
                        ${g.local} <span style="color:var(--orange); font-size:0.7rem;">VS</span> ${g.visita}
                    </div>
                    <div style="text-align:right; font-size:0.7rem; font-weight:bold; color:#555; border-top: 1px solid #eee; pt:3px;">
                        ${g.cat}
                    </div>
                </div>
            `;
        });
    }
    container.innerHTML = htmlContent;
}

function renderSancionesCards() {
    // Reutilizamos la lógica compacta para sanciones
    const sectionContainer = document.querySelector('#sanciones .container');
    sectionContainer.innerHTML = `
        <h2 class="accent-title">REPORTE DISCIPLINARIO</h2>
        <div class="games-grid" id="sanciones-cards-container"></div>
    `;

    const cardsContainer = document.getElementById('sanciones-cards-container');
    let htmlContent = '';

    LIGA_DB.sanciones.forEach(s => {
        htmlContent += `
            <div class="game-card-compact" style="border-left-color: #ff0000">
                <div style="display:flex; justify-content: space-between; font-size:0.7rem; margin-bottom:5px;">
                    <span style="color:red; font-weight:bold;">${s.status}</span>
                    <span>${s.cat}</span>
                </div>
                <div style="text-align:center; padding:5px 0;">
                    <div style="font-weight:bold; font-size:1rem;">${s.nombre}</div>
                    <div style="font-size:0.75rem; color:#666;">${s.motivo}</div>
                </div>
                <div style="font-size:0.7rem; background:#fff1f1; color:red; text-align:center; font-weight:bold; padding:2px; border-radius:3px;">
                    ${s.castigo}
                </div>
            </div>
        `;
    });
    cardsContainer.innerHTML = htmlContent;
}

function navigateTo(section) {
    const link = document.querySelector(`[data-section="${section}"]`);
    if (link) link.click();
}
