/* Catalogue produits — source de vérité partagée entre toutes les pages.
   Données issues du classeur fourni par l'atelier (noms, composition, INCI, surgras, certifications).
   Prix : 6 € le savon. Offre dégressive gérée dans cart.js (3 = 15 €, 4+ = 5 €/savon).
   ⚠️ Photos = placeholders à remplacer par de vraies photos des savons
   CITRUS / SYLVA / SOLIS / DUNA / NATURA / LAURUS. */

window.LSL = window.LSL || {};

window.LSL.products = {
    'citrus': {
        id: 'citrus',
        collection: 'ete',
        num: '01',
        name: 'Citrus',
        subtitle: 'Litsée citronnée · surgras 9 %',
        price: 6.00,
        weight: '≈ 100 g',
        category: 'energisant',
        categoryLabel: 'Agrumes',
        photo: 'images/produits/agrumes.jpg',
        short: "Une note d'agrume fraîche et pétillante, à l'huile essentielle de litsée citronnée.",
        description: "Savon parfumé à l'huile essentielle de litsée citronnée — vif, frais, presque citronné. Coloré à l'oxyde minéral jaune. Saponifié à froid, surgras à 9 %.",
        composition: "Beurre de Karité Bio 40 %, Huile d'Abricot Bio 20 %, Huile de Coprah Bio 20 %, Huile d'Olive Bio 20 %.",
        inci: "Sodium Shea Butterate, Sodium Apricot Kernelate, Sodium Cocoate, Sodium Olivate, Aqua, Glycerin, Litsea Cubeba Fruit Oil, CI 77492, Citral, Limonene, Linalool.",
        certif: "Huile essentielle bio, 100 % d'origine naturelle — certifié Ecocert (FR-BIO-01).",
        warnings: "Contient citral, limonène et linalol, allergènes naturellement présents dans l'huile essentielle."
    },
    'sylva': {
        id: 'sylva',
        collection: 'automne',
        num: '02',
        name: 'Sylva',
        subtitle: 'Menthe poivrée & cèdre · surgras 9 %',
        price: 6.00,
        weight: '≈ 100 g',
        category: 'energisant',
        categoryLabel: 'Frais & boisé',
        photo: 'images/produits/litsee-citronnee.jpg',
        short: "Une fraîcheur boisée : menthe poivrée et cèdre de l'Atlas.",
        description: "Le souffle de la forêt — menthe poivrée vive adoucie par le cèdre. Argile verte montmorillonite et oxyde minéral vert. Saponifié à froid, surgras à 9 %.",
        composition: "Beurre de Karité Bio 40 %, Huile d'Abricot Bio 20 %, Huile de Coprah Bio 20 %, Huile d'Olive Bio 20 %. Argile verte montmorillonite surfine 2 %.",
        inci: "Sodium Shea Butterate, Sodium Apricot Kernelate, Sodium Cocoate, Sodium Olivate, Aqua, Glycerin, Montmorillonite, Mentha Piperita Oil, Cedrus Atlantica Bark Oil, CI 77288, Limonene, Linalool.",
        certif: "Huiles essentielles bio, 100 % d'origine naturelle — certifié Ecocert (FR-BIO-01).",
        warnings: "Contient limonène et linalol. Huile essentielle de menthe poivrée : déconseillé aux femmes enceintes et aux enfants de moins de 6 ans."
    },
    'solis': {
        id: 'solis',
        collection: 'printemps',
        num: '03',
        name: 'Solis',
        subtitle: 'Orange douce · surgras 9 %',
        price: 6.00,
        weight: '≈ 100 g',
        category: 'relaxant',
        categoryLabel: 'Agrumes doux',
        photo: 'images/produits/rose-geranium.jpg',
        short: "L'huile essentielle d'orange douce, ronde et lumineuse, sur fond d'argile rouge.",
        description: "Un savon doux et solaire à l'huile essentielle d'orange douce, coloré naturellement par l'argile rouge surfine. Saponifié à froid, surgras à 9 %.",
        composition: "Beurre de Karité Bio 40 %, Huile d'Abricot Bio 20 %, Huile de Coprah Bio 20 %, Huile d'Olive Bio 20 %. Argile rouge surfine 2 %.",
        inci: "Sodium Shea Butterate, Sodium Apricot Kernelate, Sodium Cocoate, Sodium Olivate, Aqua, Glycerin, Illite, Citrus Aurantium Dulcis Peel Oil, Limonene, Linalool.",
        certif: "Huile essentielle bio, 100 % d'origine naturelle — certifié Ecocert (FR-BIO-01).",
        warnings: "Contient limonène et linalol, allergènes naturellement présents dans l'huile essentielle."
    },
    'duna': {
        id: 'duna',
        collection: 'ete',
        num: '04',
        name: 'Duna',
        subtitle: 'Monoï · surgras 9 %',
        price: 6.00,
        weight: '≈ 100 g',
        category: 'doux',
        categoryLabel: 'Floral exotique',
        photo: 'images/produits/lavandin.jpg',
        short: "Une parenthèse balnéaire, à la fragrance de Monoï d'origine naturelle.",
        description: "Le parfum solaire du Monoï, porté par une fragrance cosmétique d'origine 100 % naturelle (origine France), et un bleu doux d'oxyde minéral. Saponifié à froid, surgras à 9 %.",
        composition: "Beurre de Karité Bio 40 %, Huile d'Abricot Bio 20 %, Huile de Coprah Bio 20 %, Huile d'Olive Bio 20 %.",
        inci: "Sodium Shea Butterate, Sodium Apricot Kernelate, Sodium Cocoate, Sodium Olivate, Aqua, Glycerin, Parfum, CI 77007, Linalool, Benzyl Benzoate, Eugenol, Farnesol, Geraniol, Benzyl Salicylate.",
        certif: "Fragrance cosmétique 100 % d'origine naturelle, origine France (hors certification Ecocert).",
        warnings: "Contient linalol, benzyl benzoate, eugénol, farnésol, géraniol et salicylate de benzyle, allergènes de la fragrance."
    },
    'natura': {
        id: 'natura',
        collection: 'automne',
        num: '05',
        name: 'Natura',
        subtitle: 'Sans parfum · surgras 9 %',
        price: 6.00,
        weight: '≈ 100 g',
        category: 'doux',
        categoryLabel: 'Neutre',
        photo: 'images/produits/fleur-coton.jpg',
        short: "La recette la plus nue : ni parfum, ni huile essentielle, ni colorant.",
        description: "Pour les peaux qui ne supportent rien. Aucun parfum, aucune huile essentielle, aucun colorant ajouté — juste la base de savon surgras, saponifiée à froid.",
        composition: "Beurre de Karité Bio 40 %, Huile d'Abricot Bio 20 %, Huile de Coprah Bio 20 %, Huile d'Olive Bio 20 %.",
        inci: "Sodium Shea Butterate, Sodium Apricot Kernelate, Sodium Cocoate, Sodium Olivate, Aqua, Glycerin.",
        certif: "Ingrédients bio. Sans huile essentielle, sans parfum, sans colorant.",
        warnings: "Sans huile essentielle ni parfum : adapté aux peaux sensibles. Pigment éventuel à confirmer."
    },
    'laurus': {
        id: 'laurus',
        collection: 'hiver',
        num: '06',
        name: 'Laurus',
        subtitle: "Savon d'Alep · sans parfum",
        price: 6.00,
        weight: '≈ 100 g',
        category: 'doux',
        categoryLabel: "Tradition d'Alep",
        photo: 'images/produits/fleur-coton.jpg',
        short: "Le savon d'Alep dans la tradition : huile d'olive et baies de laurier, rien d'autre.",
        description: "Deux ingrédients, des siècles d'usage : huile d'olive et huile de baies de laurier. Sans parfum, sans colorant. Saponifié à froid, surgras à 9 %.",
        composition: "Huile d'Olive 70 %, Huile de Baies de Laurier 30 %.",
        inci: "Sodium Olivate, Sodium Laurate, Aqua, Glycerin.",
        certif: "Savon d'Alep — huile d'olive et baies de laurier. Sans parfum ni colorant.",
        warnings: "Sans parfum ni huile essentielle. Convient aux peaux réactives ; l'huile de laurier peut rarement être allergisante."
    }
};

window.LSL.collections = {
    printemps: { label: 'Printemps', note: 'Douces et lumineuses', cover: 'images/produits/rose-geranium.jpg' },
    ete:       { label: 'Été',       note: 'Fraîches et solaires', cover: 'images/produits/agrumes.jpg' },
    automne:   { label: 'Automne',   note: 'Boisées et nues',      cover: 'images/produits/fleur-coton.jpg' },
    hiver:     { label: 'Hiver',     note: "Tradition d'Alep",     cover: 'images/produits/litsee-citronnee.jpg' }
};

window.LSL.collectionLabel = function(key) {
    return (window.LSL.collections[key] || {}).label || '';
};

window.LSL.formatPrice = function(value) {
    return value.toFixed(2).replace('.', ',') + ' €';
};
