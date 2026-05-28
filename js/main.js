/* Comportements communs à toutes les pages */

(function() {
    document.addEventListener('DOMContentLoaded', () => {

        // Bandeau promo (injecté en haut de toutes les pages)
        if (!document.querySelector('.announce')) {
            const bar = document.createElement('div');
            bar.className = 'announce';
            bar.innerHTML = '<strong>Trio découverte : 3 savons à 15 €</strong> au lieu de <s>18 €</s> <a href="boutique.html">Je compose mon trio →</a>';
            document.body.insertBefore(bar, document.body.firstChild);
        }

        // Burger mobile
        const burger = document.querySelector('.nav-burger');
        const nav = document.querySelector('.main-nav');
        if (burger && nav) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('is-open');
                burger.classList.toggle('is-open');
                const isOpen = nav.classList.contains('is-open');
                document.body.style.overflow = isOpen ? 'hidden' : '';
                burger.setAttribute('aria-expanded', isOpen);
            });

            nav.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    nav.classList.remove('is-open');
                    burger.classList.remove('is-open');
                    document.body.style.overflow = '';
                });
            });
        }

        // Reveal au scroll
        const revealEls = document.querySelectorAll('.reveal');
        if (revealEls.length && 'IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
            revealEls.forEach(el => io.observe(el));
        }
    });

    // Toast
    window.LSL = window.LSL || {};
    window.LSL.toast = function(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const el = document.createElement('div');
        el.className = 'toast';
        el.textContent = message;
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('is-visible'));
        setTimeout(() => {
            el.classList.remove('is-visible');
            setTimeout(() => el.remove(), 300);
        }, 2600);
    };
})();
