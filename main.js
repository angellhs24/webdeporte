const LIGA_DB = {
    sabado: generateGames(),
    domingo: generateGames(),
    sanciones: [
        { nombre: "Carlos R. (Bruins)", motivo: "Falta Técnica Art. 47", castigo: "1 Partido", status: "Pendiente", cat: "Varonil B" }
    ]
};

// Cargar favoritos del LocalStorage
let favoritos = JSON.parse(localStorage.getItem('liga_favs')) || [];

function generateGames() {
    const data = {};
    const canchas = ["Cancha 7", "Cancha 6", "Cancha 5", "Cancha 4", "Cancha 3", "Cancha 2", "Cancha 1", "Cancha Central"];
    const equipos = ["TITANES", "AZTECAS", "LOBOS", "EAGLES", "BRUINS", "LINKERS", "DRAGONES", "WARRIORS", "COBRAS", "REBELDES"];
    const tipos = ["CAMP", "PRACT", "OFICIAL"];
    const categorias = ["Varonil Libre", "Veteranos", "Juvenil", "Femenil"];

    canchas.forEach(cancha => {
        data[cancha] = [];
        for (let i = 0; i < 5; i++) {
            data[cancha].push({
                id: Math.random().toString(36).substr(2, 9), // ID único para cada juego
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
    // ... Navegación existente ...
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
            } else {
                document.getElementById(target).classList.add('active');
            }
        });
    });

    // Lógica del BUSCADOR
    const searchInput = document.getElementById('game-search');
    searchInput.addEventListener('input', (e) => {
        const activeDia = document.querySelector('.nav-link.active').getAttribute('data-section');
        renderGamesByCancha(activeDia, e.target.value.toLowerCase());
    });
});

function toggleFavorito(equipo) {
    const index = favoritos.indexOf(equipo);
    if (index > -1) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(equipo);
    }
    localStorage.setItem('liga_favs', JSON.stringify(favoritos));
    const activeDia = document.querySelector('.nav-link.active').getAttribute('data-section');
    renderGamesByCancha(activeDia, document.getElementById('game-search').value);
}

function renderGamesByCancha(dia, filter = "") {
    const container = document.getElementById('games-container');
    const title = document.getElementById('view-title');
    title.innerText = `ROL DE JUEGOS - ${dia.toUpperCase()}`;
    
    let htmlContent = '';
    const dataDia = LIGA_DB[dia];

    for (const cancha in dataDia) {
        // Filtrar juegos de esta cancha
        const juegosFiltrados = dataDia[cancha].filter(g => 
            g.local.toLowerCase().includes(filter) || 
            g.visita.toLowerCase().includes(filter)
        );

        if (juegosFiltrados.length > 0) {
            htmlContent += `<h3 class="cancha-title"><i class="fas fa-map-marker-alt"></i> ${cancha.toUpperCase()}</h3>`;
            
            juegosFiltrados.forEach(g => {
                const esFavLocal = favoritos.includes(g.local);
                const esFavVisita = favoritos.includes(g.visita);
                const highlight = (esFavLocal || esFavVisita) ? 'border-left: 8px solid gold; background: #fffdf0;' : '';

                htmlContent += `
                    <div class="game-card-compact" style="${highlight}">
                        <div style="display:flex; justify-content: space-between; font-size:0.7rem; color:#888;">
                            <span>${g.hora}</span>
                            <span style="font-weight:bold; color:var(--orange)">${g.tipo}</span>
                        </div>
                        <div style="text-align:center; font-weight:700; font-size:0.95rem; margin: 8px 0;">
                            <span onclick="toggleFavorito('${g.local}')" style="cursor:pointer; color:${esFavLocal?'gold':'#ccc'}">★</span>
                            ${g.local} 
                            <span style="color:var(--orange); font-size:0.7rem;">VS</span> 
                            ${g.visita}
                            <span onclick="toggleFavorito('${g.visita}')" style="cursor:pointer; color:${esFavVisita?'gold':'#ccc'}">★</span>
                        </div>
                        <div style="text-align:right; font-size:0.7rem; font-weight:bold; color:#555; border-top: 1px solid #eee; padding-top:3px;">
                            ${g.cat}
                        </div>
                    </div>
                `;
            });
        }
    }
    container.innerHTML = htmlContent || '<p style="text-align:center; grid-column: 1/-1; padding: 20px;">No se encontraron equipos con ese nombre.</p>';
}
