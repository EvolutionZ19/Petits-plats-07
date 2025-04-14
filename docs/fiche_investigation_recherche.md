
# Fiche d'investigation – Comparaison des algorithmes de recherche (Projet Les Petits Plats)

## 🎯 Objectif

Implémenter deux deux versions de l’algorithme de recherche dans un tableau de recettes, puis les comparer pour déterminer la plus performante et maintenable, selon les bonnes pratiques de développement.

---

## 🔎 Versions comparées

### ✅ Version 1 — Programmation fonctionnelle (`search.js`)

- Utilise les méthodes `filter`, `some`, `includes`
- Code concis, expressif et facile à maintenir
- Moins performant sur de très grands tableaux

### ✅ Version 2 — Boucles natives (`search-loop.js`)

- Utilise `for`, `for...of`, `break`
- Code plus verbeux, mais plus performant
- Meilleur contrôle du flux d'exécution

---

## 🧠 Algorigrammes

### 🟨 Version 1 – Fonctionnelle

```
Début
↓
→ Normaliser la query
→ Filter les recettes :
   → match = nom OU description OU ingrédients OU appareil OU ustensiles
→ Filter selon tags avec some()
↓
Retourner les résultats
```

### 🟦 Version 2 – Boucles natives

```
Début
↓
→ Normaliser la query
→ Parcourir chaque recette
   → Vérifier le nom, description, ingrédients
→ Si match → ajouter à result
→ Parcourir les tags un par un
   → Vérifier chaque champ avec des boucles for
↓
Retourner les résultats filtrés
```

---

## 🧪 Comparatif de performance (via Jsben.ch)

| Critère                        | Fonctionnelle (`filter`) | Boucles (`for`)   |
|-------------------------------|---------------------------|-------------------|
| Lisibilité                    | ✅ Très lisible           | 🔸 Moins lisible  |
| Facilité de maintenance       | ✅ Rapide à adapter       | 🔸 Plus rigide    |
| Performance (5000 items)      | 🔸 Moyenne (~60 ops/sec)  | ✅ Plus rapide (~90 ops/sec) |
| Optimisation future (profiling) | 🔸 Moins malléable      | ✅ Fine-grain possible |
| Support des navigateurs       | ✅ Universel              | ✅ Universel      |

---

## ✅ Recommandation

Pour ce projet, la **version fonctionnelle (`search.js`) est recommandée** car :

- Elle est plus simple à lire, à tester et à adapter
- Elle suffit largement pour une base de 50 à 1000 recettes
- Le léger coût en performance n’impacte pas l’expérience utilisateur

---

## 📁 Fichiers testés

- `search.js` (version actuelle utilisée)
- `search-loop.js` (version alternative à base de boucles)
