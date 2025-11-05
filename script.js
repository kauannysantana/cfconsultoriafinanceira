document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    // Verifica se o elemento header existe
    if (header) {
        window.addEventListener('scroll', function() {
            // Se a posição de rolagem vertical (scrollY) for maior que 50 pixels,
            // adiciona a classe 'scrolled'. Caso contrário, remove.
            // O valor 50 é arbitrário e pode ser ajustado.
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});