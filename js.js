document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const header = document.querySelector('header');

    function activateNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 0;
        const activationThreshold = headerHeight + 80;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionId = section.getAttribute('id');
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY + activationThreshold >= sectionTop && scrollY < sectionBottom) {
                current = sectionId;
                break;
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink();

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }

            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('active-timeline');
            });
            this.classList.add('active-timeline');
        });
    });

    const typedTextSpan = document.getElementById('typed-text');
    const phrases = ["Desenvolvedor em Formação", "Entusiasta de Tecnologia", "Resolvendo Desafios"];
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