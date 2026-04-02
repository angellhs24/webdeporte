/**
 * LIGA DE BASQUETBOL SIERRA JUÁREZ - CORE LOGIC
 * Optimizado para rendimiento y visualización de gran volumen de datos
 */

const LIGA_DB = {
    sabado: generateGames("SÁBADO"),
    domingo: generateGames("DOMINGO"),
    sanciones: [
        { nombre: "Carlos R. (Bruins)", motivo: "Falta Técnica Art. 47", castigo: "1 Partido", status: "Pendiente", cat: "Varonil B" },
        { nombre: "Luis M. (Viejos Lobos)", motivo: "Acumulación de amarillas", castigo: "2 Partidos", status: "Activa", cat: "Veteranos" },
        { nombre: "Equipo Linkers B", motivo: "Falta de pago Tesorería", castigo: "Suspensión Temporal", status: "Urgente", cat: "Varonil B" }
    ]
};

// Función auxiliar para generar los 40 partidos por día solicitados
function generateGames(dia) {
    const juegos = [];
    const canchas = ["Cancha Central", "Cancha 1", "Cancha 2", "Cancha 3", "Cancha 4", "Cancha 5", "Cancha 6", "Cancha 7"];
    const equipos = ["TITANES", "AZTECAS", "LOBOS", "EAGLES", "BRUINS", "LINKERS", "DRAGONES", "WARRIORS", "COBRAS", "REBELDES"];
    const tipos = ["CAMP", "PRACT", "OFICIAL"];
    const categorias = ["Varonil Libre", "Veteranos", "Juvenil", "Femenil"];

    canchas.forEach(cancha => {
        for (let i = 0; i < 5; i++) {
            const hora = `${8 + i}:00 AM`;
            juegos.push({
                lugar: cancha,
                hora: hora,
                local: equipos[Math.floor(Math.random() * equipos.length)],
                visita: equipos[Math.floor(Math.random() * equipos.length)],
                tipo: tipos[Math.floor(Math.random() * tipos.length)],
                cat: categorias[Math.floor(Math.random() * categorias.length)]
            });
        }
    });
    return juegos;
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-section');

            // UI Update: Active Links
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // UI Update: Sections
            sections.forEach(s => s.classList.remove('active'));
            
            if (target === 'sabado' || target === 'domingo') {
                renderGames(target);
                document.getElementById('partidos-view').classList.add('active');
            } else if (target === 'sanciones') {
                renderSanciones(); // Ahora renderiza con el nuevo formato
                document.getElementById('sanciones').classList.add('active');
            } else {
                document.getElementById(target).classList.add('active');
            }
        });
    });

    // Carga inicial de sanciones
    renderSanciones();
});

function renderGames(dia) {
    const container = document.getElementById('games-container');
    const title = document.getElementById('view-title');
    title.innerText = `ROL DE JUEGOS - ${dia.toUpperCase()}`;
    
    // Limpiamos y usamos un fragmento o string acumulado para no saturar el reflow
    let htmlContent = '';

    LIGA_DB[dia].forEach(g => {
        htmlContent += `
            <div class="news-item" style="border-left: 6px solid var(--orange)">
                <div style="display:flex; justify-content: space-between; font-weight:bold; font-size:0.75rem; color:#666; margin-bottom:10px;">
                    <span><i class="fas fa-map-marker-alt"></i> ${g.lugar}</span>
                    <span><i class="fas fa-clock"></i> ${g.hora}</span>
                </div>
                <div style="text-align:center; padding:10px 0; font-size:1.1rem; font-weight:700;">
                    ${g.local} <span style="color:var(--orange)">VS</span> ${g.visita}
                </div>
                <div style="display:flex; justify-content: space-between; align-items:center; margin-top:10px; border-top: 1px solid #eee; pt: 5px;">
                    <span style="font-size:0.7rem; background:#eee; padding:2px 6px; border-radius:3px; font-weight:bold;">${g.tipo}</span>
                    <span style="font-size:0.8rem; color:var(--orange); font-weight:bold;">${g.cat}</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = htmlContent;
}

function renderSanciones() {
    const container = document.getElementById('sanciones-list'); // Nota: Cambié esto para que sea un contenedor div, no una tabla si prefieres el formato de cards
    const sectionContainer = document.querySelector('#sanciones .container');
    
    // Cambiamos el comportamiento: Si quieres el formato de Rol de Juegos, inyectamos un Grid
    sectionContainer.innerHTML = `
        <h2 class="accent-title">REPORTE DISCIPLINARIO</h2>
        <div class="games-grid" id="sanciones-cards-container"></div>
    `;

    const cardsContainer = document.getElementById('sanciones-cards-container');
    let htmlContent = '';

    LIGA_DB.sanciones.forEach(s => {
        htmlContent += `
            <div class="news-item" style="border-left: 6px solid #ff0000">
                <div style="display:flex; justify-content: space-between; font-weight:bold; font-size:0.75rem; color:#666;">
                    <span>ESTADO: <span style="color:red">${s.status.toUpperCase()}</span></span>
                    <span>${s.cat}</span>
                </div>
                <div style="text-align:center; padding:15px 0;">
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--black)">${s.nombre}</div>
                    <div style="font-size:0.9rem; color:#555; margin-top:5px;">${s.motivo}</div>
                </div>
                <div style="text-align:center; background: #fff1f1; padding:5px; border-radius:5px; font-weight:bold; color:red; font-size:0.8rem;">
                    SANCIÓN: ${s.castigo}
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
