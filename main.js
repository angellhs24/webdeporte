// BASE DE DATOS LOCAL (Simulada)
const LIGA_DATA = {
    sabado: [
        { cancha: "Domo Municipal", hora: "08:00 AM", local: "RAYOS", visitante: "HALCONES", cat: "Varonil Libre" },
        { cancha: "Cancha Anexa", hora: "09:30 AM", local: "CENTELLAS", visitante: "AZTECAS", cat: "Femenil" },
        { cancha: "Domo Municipal", hora: "11:00 AM", local: "TITANES", visitante: "WARRIORS", cat: "Varonil Libre" }
    ],
    domingo: [
        { cancha: "Domo Municipal", hora: "10:00 AM", local: "COBRAS", visitante: "LOBOS", cat: "Juvenil" },
        { cancha: "Cancha Anexa", hora: "12:00 PM", local: "DIABLOS", visitante: "ASTROS", cat: "Veteranos" }
    ],
    sanciones: [
        { sujeto: "Roberto M. (Bulls)", motivo: "Falta Técnica / Insultos", tiempo: "1 Juego", estado: "Pendiente" },
        { sujeto: "Equipo 'Pumas'", motivo: "No presentarse (Forfeit)", tiempo: "Multa $300", estado: "Pagado" }
    ]
};

// AL CARGAR EL DOCUMENTO
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    renderSanciones();
});

// GESTIÓN DE NAVEGACIÓN
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-section');

            // Actualizar estilo del enlace
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Cambiar sección con animación
            sections.forEach(s => s.classList.remove('active'));
            
            if (target === 'sabado' || target === 'domingo') {
                document.getElementById('partidos-view').classList.add('active');
                renderPartidos(target);
            } else {
                document.getElementById(target).classList.add('active');
            }
        });
    });
}

// RENDERIZADO DE PARTIDOS (TIPO FIXTURE)
function renderPartidos(dia) {
    const container = document.getElementById('games-grid');
    const title = document.getElementById('view-title');
    
    title.innerHTML = `ROL DE JUEGOS - ${dia.toUpperCase()}`;
    container.innerHTML = ''; // Limpiar contenedor

    LIGA_DATA[dia].forEach(match => {
        const card = `
            <div class="game-card">
                <div class="game-meta">
                    <span><i class="fas fa-map-pin"></i> ${match.cancha}</span>
                    <span><i class="fas fa-clock"></i> ${match.hora}</span>
                </div>
                <div class="game-teams">
                    <div class="team">${match.local}</div>
                    <div class="vs-circle">VS</div>
                    <div class="team">${match.visitante}</div>
                </div>
                <div class="game-meta" style="justify-content: center; background: white; border-top: 1px dashed #ddd;">
                    <span style="color: var(--naranja)">CATEGORÍA: ${match.cat}</span>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// RENDERIZADO DE SANCIONES
function renderSanciones() {
    const tbody = document.getElementById('sanciones-list');
    LIGA_DATA.sanciones.forEach(s => {
        const row = `
            <tr>
                <td><strong>${s.sujeto}</strong></td>
                <td>${s.motivo}</td>
                <td>${s.tiempo}</td>
                <td><span class="status-pill">${s.estado}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// FUNCIÓN AUXILIAR PARA BOTONES HERO
function navigateTo(sectionName) {
    const link = document.querySelector(`[data-section="${sectionName}"]`);
    if(link) link.click();
}
