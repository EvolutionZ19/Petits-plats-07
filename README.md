# Les Petits Plats 🍲

> Moteur de recherche de recettes ultra-performant, simple et intuitif.

---

## 🔍 Objectif

Ce projet a été réalisé dans le cadre du parcours "Développeur Front-End" d'OpenClassrooms. Le but était d'implémenter un moteur de recherche avancé pour retrouver des recettes à partir de mots-clés, d'ingrédients, d'appareils ou d'ustensiles.

---

## 🚀 Fonctionnalités principales

- Recherche dynamique via une **barre principale** (3 caractères minimum)
- **Filtres personnalisés** par ingrédients, appareils et ustensiles
- Sélection multiple de **tags** pour affiner les résultats
- **Mise à jour en temps réel** du compteur de recettes affichées
- Comportement responsive et expérience utilisateur fluide

---

## 💡 Stack technique

- HTML5 / CSS3 (vanilla)
- JavaScript ES6 (modulaire)

---

## 🔁 Organisation du code

├── data │ └── recipes.js # Données des recettes ├── scripts │ ├── index.js # Point d'entrée principal │ ├── dom.js # Affichage des recettes (DOM) │ ├── search.js # Moteur de recherche fonctionnel │ ├── search-loop.js # Version alternative avec boucles │ ├── filters.js # Génération des dropdowns et filtres │ └── tags.js # Gestion des tags dynamiques ├── styles │ ├── global.css # Style global et variables │ ├── layout.css # Mise en page du site │ ├── cards.css # Style des recettes │ ├── dropdown.css # Apparence des filtres │ ├── tags.css # Apparence des tags │ └── no_result.css # Message d'erreur └── index.html

---

## 🎨 Maquette de référence

Le projet respectela maquette officielle fournie par OpenClassrooms :
- Rendu visuel conforme
- Polices, couleurs, espacements respectés
- Adaptation responsive
- www.figma.com/file/LY5VQTAqnrAf0bWObOBrt8/Les-petits-plats---Maquette-2.0?type=design&node-id=0%3A1&t=23dNyQrjg9DVtnrM-1

---

## 📊 Benchmarks techniques

Deux méthodes de recherche ont été comparées (voir `fiche_investigation_recherche.md`) :

| Version          | Lisibilité | Performance | Maintenabilité |
|------------------|-------------|-------------|----------------|
| Fonctionnelle    | ✅ Très lisible | Moyenne     | ✅ Facile à maintenir |
| Boucles natives  | 🔸 Moins claire | ✅ Performante | 🔸 Plus rigide |

**Choix final :** la version fonctionnelle pour sa lisibilité, sa clarté et sa rapidité de mise en œuvre.

---

## 🔍 Fonctionnement du moteur de recherche

- Recherche dans le nom, la description, les ingrédients, l'appareil ou les ustensiles
- Prise en compte de tous les tags actifs (logique **ET** entre eux)
- Affichage d'un message personnalisé si aucune recette ne correspond

---

## 📦 Lancement du projet

1. Cloner ce repo :

```bash
git clone https://github.com/EvolutionZ19/Petits-plat-07.git
```
