/* Panier en localStorage — partagé entre toutes les pages */

(function() {
    const KEY = 'savons-lolo-cart';

    const Cart = {
        load() {
            try {
                return JSON.parse(localStorage.getItem(KEY)) || [];
            } catch {
                return [];
            }
        },

        save(cart) {
            localStorage.setItem(KEY, JSON.stringify(cart));
            this.updateBadge();
        },

        add(productId, qty = 1) {
            if (!window.LSL.products[productId]) return false;
            const cart = this.load();
            const existing = cart.find(item => item.id === productId);
            if (existing) {
                existing.qty = Math.min(existing.qty + qty, 50);
            } else {
                cart.push({ id: productId, qty: Math.min(qty, 50) });
            }
            this.save(cart);
            return true;
        },

        remove(productId) {
            const cart = this.load().filter(item => item.id !== productId);
            this.save(cart);
        },

        setQty(productId, qty) {
            const cart = this.load();
            const line = cart.find(item => item.id === productId);
            if (!line) return;
            if (qty <= 0) {
                this.remove(productId);
                return;
            }
            line.qty = Math.min(qty, 50);
            this.save(cart);
        },

        clear() {
            localStorage.removeItem(KEY);
            this.updateBadge();
        },

        count() {
            return this.load().reduce((sum, item) => sum + item.qty, 0);
        },

        subtotal() {
            return this.load().reduce((sum, item) => {
                const product = window.LSL.products[item.id];
                return sum + (product ? product.price * item.qty : 0);
            }, 0);
        },

        // Offre : 3 savons = 14,99 € (3ᵉ offert), 4 savons et + = 5,99 € le savon
        pricing() {
            const lines = this.lines();
            const count = lines.reduce((s, l) => s + l.qty, 0);
            const gross = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
            let net = gross, offer = '';
            if (count >= 4) { net = count * 5.99; offer = 'Offre coffret — 5,99 € le savon'; }
            else if (count === 3) { net = 14.99; offer = 'Trio — le 3ᵉ savon offert'; }
            const discount = Math.round((gross - net) * 100) / 100;
            return { count, gross, net, discount, offer };
        },

        // Message d'incitation à compléter le panier
        nudge() {
            const count = this.count();
            if (count === 0 || count >= 4) return null;
            if (count < 3) {
                const need = 3 - count;
                return `Ajoutez ${need} savon${need > 1 ? 's' : ''} pour débloquer le 3ᵉ savon OFFERT (trio à 14,99 €)`;
            }
            return 'Ajoutez 1 savon : passez en coffret à 5,99 €/savon (–4 €)';
        },

        lines() {
            return this.load().map(item => ({
                ...item,
                product: window.LSL.products[item.id]
            })).filter(line => line.product);
        },

        updateBadge() {
            const count = this.count();
            document.querySelectorAll('.cart-link__count').forEach(el => {
                el.textContent = count;
                el.setAttribute('data-count', count);
            });
        }
    };

    window.LSL = window.LSL || {};
    window.LSL.Cart = Cart;
    window.LSL.SHIPPING = { threshold: 25, cost: 4.90 };

    document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
})();
