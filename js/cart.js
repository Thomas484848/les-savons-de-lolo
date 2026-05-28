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

        // Règle unique : tous les 3 savons achetés, le 3ᵉ est offert (B2G1 répété)
        pricing() {
            const lines = this.lines();
            const count = lines.reduce((s, l) => s + l.qty, 0);
            const gross = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
            const freebies = Math.floor(count / 3);
            const net = Math.round((count - freebies) * 5.99 * 100) / 100;
            const discount = Math.round((gross - net) * 100) / 100;
            let offer = '';
            if (freebies === 1) offer = 'Le 3ᵉ savon offert';
            else if (freebies > 1) offer = `${freebies} savons offerts`;
            return { count, gross, net, discount, offer, freebies };
        },

        // Relance vers le prochain palier (multiple de 3)
        nudge() {
            const count = this.count();
            if (count === 0) return null;
            const togo = 3 - (count % 3);
            if (togo === 3) return null;
            if (count < 3) return `Ajoutez ${togo} savon${togo > 1 ? 's' : ''} — <strong>le 3ᵉ est OFFERT</strong>`;
            return `Ajoutez ${togo} savon${togo > 1 ? 's' : ''} pour <strong>1 savon offert de plus</strong>`;
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
