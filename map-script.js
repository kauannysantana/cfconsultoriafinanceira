// Dados das zonas de atendimento
const zonas = [
    { id: 'zona-norte', nome: 'Zona Norte', cor: '#FF6B6B', bairros: 'Santana, Tremembé, Jaçanã, Mandaqui' },
    { id: 'zona-leste', nome: 'Zona Leste', cor: '#4ECDC4', bairros: 'Tatuapé, Aricanduva, Itaquera, São Mateus' },
    { id: 'zona-oeste', nome: 'Zona Oeste', cor: '#FFE66D', bairros: 'Butantã, Pinheiros, Alto de Pinheiros, Lapa' },
    { id: 'zona-sul', nome: 'Zona Sul', cor: '#95E1D3', bairros: 'Vila Mariana, Ipiranga, Saúde, Jabaquara' },
    { id: 'alto-tiete', nome: 'Alto Tietê', cor: '#C7CEEA', bairros: 'Região de Mogi das Cruzes, Suzano, Poá, Arujá, etc.' },
    { id: 'guarulhos', nome: 'Guarulhos', cor: '#FF9FF3', bairros: 'Centro, Pimentas, Macedo, Taboão, etc.' }
];

// Mapeamento de classes CSS para o nome da zona para o overlay
const classToZoneName = {
    'zona-sp': 'São Paulo (Zonas Norte, Leste, Oeste, Sul)',
    'guarulhos': 'Guarulhos',
    'alto-tiete': 'Alto Tietê',
    'nao-atende': 'Não Atendido'
};

// Função para criar e gerenciar o overlay de informações
function setupInfoOverlay() {
    const mapContainer = document.querySelector('.map-container');
    let infoOverlay = document.getElementById('map-info-overlay');

    if (!infoOverlay) {
        infoOverlay = document.createElement('div');
        infoOverlay.id = 'map-info-overlay';
        infoOverlay.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(19, 19, 26, 0.95);
            border: 1px solid rgba(4, 73, 249, 0.5);
            border-radius: 10px;
            padding: 15px;
            color: #fff;
            font-size: 14px;
            max-width: 250px;
            display: none;
            z-index: 20;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        `;
        mapContainer.appendChild(infoOverlay);
    }

    return infoOverlay;
}

// Função para mostrar informações da zona
function mostrarInfo(zonaClass, infoOverlay) {
    const nomeZona = classToZoneName[zonaClass] || 'Região Desconhecida';
    const corZona = zonas.find(z => z.id === zonaClass)?.cor || '#f0f0f0';
    const status = zonaClass === 'nao-atende' ? '❌ Não Atendido' : '✓ Atendimento disponível';
    const statusCor = zonaClass === 'nao-atende' ? '#FF6B6B' : '#4ECDC4';

    infoOverlay.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 16px; height: 16px; background: ${corZona}; border-radius: 50%; margin-right: 10px; border: 2px solid #fff;"></div>
            <h4 style="margin: 0; font-size: 16px; font-weight: 600;">${nomeZona}</h4>
        </div>
        <p style="margin: 8px 0; color: ${statusCor}; font-size: 13px; font-weight: bold;">
            ${status}
        </p>
    `;
    infoOverlay.style.display = 'block';
}

// Função para esconder informações
function esconderInfo(infoOverlay) {
    infoOverlay.style.display = 'none';
}

// Função principal para inicializar a interatividade do SVG
function initMapInteractivity() {
    const svgElement = document.querySelector('.map-container svg');
    if (!svgElement) return;

    const infoOverlay = setupInfoOverlay();

    // Selecionar todos os paths que têm classes de zona
    const paths = svgElement.querySelectorAll('.zona-sp, .guarulhos, .alto-tiete, .nao-atende');

    paths.forEach(path => {
        const zonaClass = path.classList.contains('zona-sp') ? 'zona-sp' :
                          path.classList.contains('guarulhos') ? 'guarulhos' :
                          path.classList.contains('alto-tiete') ? 'alto-tiete' :
                          'nao-atende';

        path.addEventListener('mouseenter', () => {
            mostrarInfo(zonaClass, infoOverlay);
        });

        path.addEventListener('mouseleave', () => {
            esconderInfo(infoOverlay);
        });
    });
}

// Inicializar a interatividade quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initMapInteractivity();
});

// Não é necessário reinicializar o mapa ao redimensionar, pois o SVG é responsivo por padrão.
// O código antigo de reinicialização foi removido.
