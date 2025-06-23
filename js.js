document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const header = document.querySelector('header');

    // Função para ativar o link de navegação na barra de rolagem
    function activateNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 0;
        // Ajuste o offset para ser um pouco maior, ou igual à altura do header mais uma margem
        // Isso força a seção a estar mais visível no topo para ser ativada
        const activationThreshold = headerHeight + 80; // Ajuste este valor (ex: 70, 90, 100)

        // Itera as seções de trás para frente (do final da página para o começo)
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionId = section.getAttribute('id');
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            // Condição para ativar o link:
            // O topo da seção deve estar acima ou no limiar de ativação (considerando o scroll e o header)
            // E o scroll atual deve estar acima do final da seção para garantir que a seção ainda está visível
            if (scrollY + activationThreshold >= sectionTop && scrollY < sectionBottom) {
                current = sectionId;
                break; // Encontrou a seção mais relevante no topo, pare o loop
            }
        }
        
        // Caso esteja no topo da página e nenhuma seção foi ativada (scrollY = 0)
        // Garante que "Sobre Mim" esteja ativo por padrão
        // Ajustei a condição para verificar se o scroll está bem no topo e a primeira seção ainda não "passou" do threshold
        if (current === '' && scrollY < sections[0].offsetTop + activationThreshold && sections.length > 0) {
             current = sections[0].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Adiciona o evento de scroll para ativar os links
    window.addEventListener('scroll', activateNavLink);
    // Ativa o link ao carregar a página (caso já esteja em uma seção)
    activateNavLink();

    // Smooth scroll para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Calcula a posição de rolagem, subtraindo a altura do header
            const headerHeight = header ? header.offsetHeight : 0;
            const offsetTop = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Interatividade para os itens da timeline
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove a classe 'active-timeline' de todos os itens
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('active-timeline');
            });
            // Adiciona a classe 'active-timeline' ao item clicado
            this.classList.add('active-timeline');
        });
    });

    // Lógica para a animação de digitação
    const typedTextSpan = document.getElementById('typed-text');
    const phrases = ["Desenvolvedor em Formação"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; 
    let deletingSpeed = 75; 
    let pauseBeforeDelete = 1500; 
    let pauseBeforeType = 500; 

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            currentSpeed = pauseBeforeDelete;
            isDeleting = true; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; 
            currentSpeed = pauseBeforeType;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    if (typedTextSpan) { 
        typeEffect();
    }
});