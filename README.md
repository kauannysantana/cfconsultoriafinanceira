# CF Consultoria Financeira - Site com Mapa Interativo

## 🎯 O que foi modificado

O site foi atualizado com um **mapa interativo moderno** que substitui o mapa SVG anterior por um mapa dinâmico usando **Leaflet** (OpenStreetMap).

## ✨ Recursos Implementados

### 📍 Pinos Personalizados e Chamativos
- **🔴 Zona Norte** - Santana, Tremembé, Jaçanã, Mandaqui
- **🟢 Zona Sul** - Vila Mariana, Ipiranga, Saúde, Jabaquara
- **🔵 Zona Leste** - Tatuapé, Aricanduva, Itaquera, São Mateus
- **🟡 Zona Oeste** - Butantã, Pinheiros, Alto de Pinheiros, Lapa
- **🟣 Autódromo/Alto Tietê** - Região do Autódromo e Alto Tietê
- **🟠 Guarulhos** - Centro, Pimentas, Macedo, Taboão

### 🎨 Design Moderno
- Pinos em formato de marcador com cores vibrantes
- Efeito de pulsação contínua nos pinos
- Sombras coloridas ao redor dos pinos
- Círculos de cobertura de 8km ao redor de cada região
- Tema escuro elegante no mapa

### 💬 Popups Informativos
Ao clicar em cada pino, aparece um popup com:
- Nome da região com ícone colorido
- Status de atendimento disponível
- Descrição dos bairros atendidos
- Informações sobre os serviços
- Botão "Solicitar Simulação" para conversão

### 📱 Responsivo
- Funciona perfeitamente em desktop, tablet e mobile
- Controles de zoom (+/-)
- Navegação por arrastar e soltar

## 🚀 Como usar

### Opção 1: Servidor Local Simples
```bash
# Navegue até a pasta do site
cd sitecf_google_maps

# Inicie um servidor HTTP local (Python)
python -m http.server 8080

# Ou use Node.js
npx http-server -p 8080

# Acesse no navegador
http://localhost:8080
```

### Opção 2: Hospedagem Web
Faça upload de todos os arquivos para seu servidor web (cPanel, FTP, etc.)

## 📁 Estrutura de Arquivos

```
sitecf_google_maps/
├── index.html              # Página principal (modificada)
├── map-script.js           # Script do mapa interativo (NOVO)
├── map-styles.css          # Estilos do mapa (NOVO)
├── style.css               # Estilos gerais do site
├── script.js               # Scripts gerais do site
├── form.html               # Formulário de simulação
├── logo.png                # Logo da empresa
├── about_400px_resized.png # Imagem "Sobre Nós"
└── home.png                # Imagem de fundo
```

## 🔧 Tecnologias Utilizadas

- **Leaflet.js** - Biblioteca JavaScript para mapas interativos
- **OpenStreetMap** - Dados de mapa gratuitos e de código aberto
- **CartoDB Dark Theme** - Tema escuro personalizado para o mapa
- **Font Awesome** - Ícones modernos
- **CSS3 Animations** - Animações suaves e modernas

## 🌟 Vantagens desta Solução

✅ **Sem API Key necessária** - Funciona imediatamente sem configuração
✅ **Gratuito** - OpenStreetMap é totalmente gratuito
✅ **Rápido** - Carregamento otimizado
✅ **Moderno** - Design atual e atraente
✅ **Interativo** - Usuários podem explorar o mapa
✅ **Responsivo** - Funciona em todos os dispositivos
✅ **Fácil de personalizar** - Código limpo e bem documentado

## 🎨 Personalização

### Alterar Cores dos Pinos
Edite o arquivo `map-script.js` na seção `locations`:

```javascript
const locations = [
    {
        name: 'Zona Norte',
        coords: [-23.4808, -46.6189],
        color: '#FF6B6B', // <- Altere esta cor
        icon: '🔴',
        description: 'Santana, Tremembé, Jaçanã, Mandaqui'
    },
    // ...
];
```

### Adicionar Novas Regiões
Adicione um novo objeto no array `locations` com as coordenadas desejadas.

### Alterar Raio de Cobertura
No arquivo `map-script.js`, procure por:
```javascript
radius: 8000, // 8km de raio
```
E altere o valor conforme necessário.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do WhatsApp no site.

---

**Desenvolvido com ❤️ para CF Consultoria Financeira**
