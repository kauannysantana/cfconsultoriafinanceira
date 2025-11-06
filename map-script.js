// Aguardar o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

function initMap() {
    // Coordenadas centrais de São Paulo
    const center = [-23.5505, -46.6333];

    // Criar o mapa com estilo escuro personalizado
    const map = L.map('map', {
        center: center,
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: true
    });

    // Adicionar camada de tiles com estilo escuro
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Localizações das zonas de atendimento
    const locations = [
        {
            name: 'Zona Norte',
            coords: [-23.4808, -46.6189],
            color: '#FF6B6B',
            icon: '🔴',
            description: 'Santana, Tremembé, Jaçanã, Mandaqui'
        },
        {
            name: 'Zona Sul',
            coords: [-23.6528, -46.6639],
            color: '#95E1D3',
            icon: '🟢',
            description: 'Vila Mariana, Ipiranga, Saúde, Jabaquara'
        },
        {
            name: 'Zona Leste',
            coords: [-23.5505, -46.4741],
            color: '#4ECDC4',
            icon: '🔵',
            description: 'Tatuapé, Aricanduva, Itaquera, São Mateus'
        },
        {
            name: 'Zona Oeste',
            coords: [-23.5558, -46.7297],
            color: '#FFE66D',
            icon: '🟡',
            description: 'Butantã, Pinheiros, Alto de Pinheiros, Lapa'
        },
        {
            name: 'Autódromo/Alto Tietê',
            coords: [-23.5265, -46.3425],
            color: '#C7CEEA',
            icon: '🟣',
            description: 'Região do Autódromo e Alto Tietê'
        },
        {
            name: 'Guarulhos',
            coords: [-23.4538, -46.5333],
            color: '#FF9FF3',
            icon: '🟠',
            description: 'Centro, Pimentas, Macedo, Taboão'
        }
    ];

    // Criar ícones personalizados e adicionar marcadores
    locations.forEach(location => {
        // Criar ícone HTML personalizado com animação
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div class="marker-pin" style="
                    background: ${location.color};
                    width: 40px;
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    position: absolute;
                    transform: rotate(-45deg);
                    left: 50%;
                    top: 50%;
                    margin: -20px 0 0 -20px;
                    box-shadow: 0 0 20px ${location.color}80, 0 0 40px ${location.color}40;
                    border: 3px solid #ffffff;
                    animation: pulse 2s infinite;
                ">
                    <div style="
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: rotate(45deg);
                        font-size: 20px;
                    ">${location.icon}</div>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        // Criar marcador
        const marker = L.marker(location.coords, { 
            icon: customIcon,
            riseOnHover: true
        }).addTo(map);

        // Criar conteúdo do popup
        const popupContent = `
            <div style="
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                padding: 20px;
                border-radius: 15px;
                border: 2px solid ${location.color};
                min-width: 250px;
                color: #ffffff;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: ${location.color};
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                        margin-right: 15px;
                        box-shadow: 0 4px 15px ${location.color}66;
                    ">
                        ${location.icon}
                    </div>
                    <h3 style="
                        margin: 0;
                        font-size: 20px;
                        font-weight: 700;
                    ">${location.name}</h3>
                </div>
                <div style="
                    background: rgba(4, 73, 249, 0.1);
                    padding: 12px;
                    border-radius: 10px;
                    border-left: 4px solid ${location.color};
                    margin-bottom: 15px;
                ">
                    <p style="
                        margin: 0;
                        color: #4ECDC4;
                        font-size: 14px;
                        font-weight: 600;
                    ">
                        ✓ Atendimento Disponível
                    </p>
                </div>
                <p style="
                    margin: 0 0 10px 0;
                    color: #e0e0e0;
                    font-size: 13px;
                    line-height: 1.6;
                ">
                    ${location.description}
                </p>
                <p style="
                    margin: 0 0 15px 0;
                    color: #e0e0e0;
                    font-size: 13px;
                    line-height: 1.6;
                ">
                    Oferecemos crédito rápido e fácil para CLT, Comerciantes e Motoristas de App.
                </p>
                <a href="form.html" style="
                    display: inline-block;
                    background: linear-gradient(135deg, #0449f9 0%, #0367f9 100%);
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: 600;
                    font-size: 14px;
                    box-shadow: 0 4px 15px rgba(4, 73, 249, 0.4);
                    transition: all 0.3s ease;
                ">
                    Solicitar Simulação
                </a>
            </div>
        `;

        // Adicionar popup ao marcador
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });

        // Adicionar círculo de cobertura
        L.circle(location.coords, {
            color: location.color,
            fillColor: location.color,
            fillOpacity: 0.15,
            radius: 8000, // 8km de raio
            weight: 2,
            opacity: 0.4
        }).addTo(map);

        // Animação ao passar o mouse
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });

    // Adicionar CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                box-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
            }
            50% {
                box-shadow: 0 0 30px currentColor, 0 0 60px currentColor;
            }
            100% {
                box-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
            }
        }

        .custom-marker {
            background: transparent !important;
            border: none !important;
        }

        .custom-popup .leaflet-popup-content-wrapper {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
        }

        .custom-popup .leaflet-popup-tip {
            background: #1a1a2e !important;
        }

        .leaflet-popup-close-button {
            color: #ffffff !important;
            font-size: 24px !important;
            padding: 8px 12px !important;
        }

        .leaflet-popup-close-button:hover {
            color: #0449f9 !important;
        }

        .marker-pin:hover {
            transform: rotate(-45deg) scale(1.2);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}
