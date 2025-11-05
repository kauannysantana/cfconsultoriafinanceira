// Dados das zonas de atendimento com coordenadas aproximadas
const zonas = [
    {
        id: 'zona-norte',
        nome: 'Zona Norte',
        lat: -23.45,
        lng: -46.63,
        cor: '#FF6B6B',
        bairros: 'Santana, Tremembé, Jaçanã, Mandaqui'
    },
    {
        id: 'zona-leste',
        nome: 'Zona Leste',
        lat: -23.55,
        lng: -46.45,
        cor: '#4ECDC4',
        bairros: 'Tatuapé, Aricanduva, Itaquera, São Mateus'
    },
    {
        id: 'zona-oeste',
        nome: 'Zona Oeste',
        lat: -23.55,
        lng: -46.85,
        cor: '#FFE66D',
        bairros: 'Butantã, Pinheiros, Alto de Pinheiros, Lapa'
    },
    {
        id: 'zona-sul',
        nome: 'Zona Sul',
        lat: -23.65,
        lng: -46.65,
        cor: '#95E1D3',
        bairros: 'Vila Mariana, Ipiranga, Saúde, Jabaquara'
    },
    {
        id: 'alto-tiete',
        nome: 'Alto Tietê',
        lat: -23.35,
        lng: -46.55,
        cor: '#C7CEEA',
        bairros: 'Região de Mogi das Cruzes, Suzano, Poá'
    },
    {
        id: 'guarulhos',
        nome: 'Guarulhos',
        lat: -23.35,
        lng: -46.50,
        cor: '#FF9FF3',
        bairros: 'Centro, Pimentas, Macedo, Taboão'
    }
];

// Função para inicializar o mapa
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;
    
    // Criar SVG para o mapa
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-47.5 -24 2 1.5');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    
    // Adicionar background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    background.setAttribute('fill', 'url(#mapGradient)');
    
    // Definir gradiente
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'mapGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#1a1a2e');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#16213e');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    
    svg.appendChild(defs);
    svg.appendChild(background);
    
    // Adicionar círculos para cada zona
    zonas.forEach((zona, index) => {
        // Criar grupo para cada zona
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'zona-group');
        group.setAttribute('data-zona', zona.id);
        
        // Círculo de fundo da zona (maior, semi-transparente)
        const circuloFundo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circuloFundo.setAttribute('cx', zona.lng);
        circuloFundo.setAttribute('cy', zona.lat);
        circuloFundo.setAttribute('r', '0.35');
        circuloFundo.setAttribute('fill', zona.cor);
        circuloFundo.setAttribute('opacity', '0.15');
        circuloFundo.setAttribute('class', 'zona-background');
        group.appendChild(circuloFundo);
        
        // Círculo da zona (borda)
        const circuloBorda = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circuloBorda.setAttribute('cx', zona.lng);
        circuloBorda.setAttribute('cy', zona.lat);
        circuloBorda.setAttribute('r', '0.35');
        circuloBorda.setAttribute('fill', 'none');
        circuloBorda.setAttribute('stroke', zona.cor);
        circuloBorda.setAttribute('stroke-width', '0.02');
        circuloBorda.setAttribute('opacity', '0.6');
        circuloBorda.setAttribute('class', 'zona-border');
        group.appendChild(circuloBorda);
        
        // Marcador (ponto central)
        const marcador = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marcador.setAttribute('cx', zona.lng);
        marcador.setAttribute('cy', zona.lat);
        marcador.setAttribute('r', '0.08');
        marcador.setAttribute('fill', zona.cor);
        marcador.setAttribute('class', 'zona-marker');
        marcador.setAttribute('filter', 'drop-shadow(0 0 0.05px rgba(0,0,0,0.5))');
        group.appendChild(marcador);
        
        // Adicionar interatividade
        group.style.cursor = 'pointer';
        group.addEventListener('mouseenter', () => {
            mostrarInfo(zona);
            group.style.opacity = '1';
        });
        
        group.addEventListener('mouseleave', () => {
            esconderInfo();
        });
        
        svg.appendChild(group);
    });
    
    // Adicionar título do mapa
    const titulo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    titulo.setAttribute('x', '50%');
    titulo.setAttribute('y', '5%');
    titulo.setAttribute('text-anchor', 'middle');
    titulo.setAttribute('font-size', '0.15');
    titulo.setAttribute('fill', '#0449f9');
    titulo.setAttribute('font-weight', 'bold');
    titulo.setAttribute('opacity', '0.8');
    titulo.textContent = 'Região Metropolitana de São Paulo';
    svg.appendChild(titulo);
    
    mapElement.appendChild(svg);
    
    // Adicionar overlay de informações
    const infoOverlay = document.createElement('div');
    infoOverlay.id = 'map-info-overlay';
    infoOverlay.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(19, 19, 26, 0.95);
        border: 1px solid rgba(4, 73, 249, 0.5);
        border-radius: 10px;
        padding: 20px;
        color: #fff;
        font-size: 14px;
        max-width: 250px;
        display: none;
        z-index: 20;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    `;
    mapElement.appendChild(infoOverlay);
}

// Função para mostrar informações da zona
function mostrarInfo(zona) {
    const overlay = document.getElementById('map-info-overlay');
    if (!overlay) return;
    
    overlay.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 16px; height: 16px; background: ${zona.cor}; border-radius: 50%; margin-right: 10px;"></div>
            <h4 style="margin: 0; font-size: 16px; font-weight: 600;">${zona.nome}</h4>
        </div>
        <p style="margin: 8px 0; color: #ccc; font-size: 13px;">
            <strong>Bairros:</strong> ${zona.bairros}
        </p>
        <p style="margin: 8px 0; color: #0449f9; font-size: 12px;">
            ✓ Atendimento disponível
        </p>
    `;
    overlay.style.display = 'block';
}

// Função para esconder informações
function esconderInfo() {
    const overlay = document.getElementById('map-info-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Inicializar mapa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que o elemento está visível
    setTimeout(initMap, 100);
});

// Reinicializar mapa ao redimensionar a janela
window.addEventListener('resize', function() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = '';
        initMap();
    }
});
