# La Taupe — jeu d'agents secrets

Jeu d'ambiance à mots, de 3 à 12 joueurs, sur un seul téléphone.
Tout le monde a le même mot… sauf la taupe. À vous de la démasquer !

## Jouer

Ouvrir la page sur un téléphone, puis l'ajouter à l'écran d'accueil
(menu du navigateur › « Ajouter à l'écran d'accueil ») pour l'avoir comme une appli.
Une fois ouverte une première fois, le jeu fonctionne même sans connexion.

## Modifier les mots

Toutes les paires sont dans **`paires.js`**. Chaque ligne :

```js
["Mot A", "Mot B", "F"],   // F = facile, M = moyen, E = expert
```

Le jeu tire au sort lequel des deux mots est celui des agents.
Ne change pas l'`id` d'un thème existant (il sert à l'historique des paires déjà jouées).

## Contenu

- `index.html` — le jeu
- `paires.js` — la banque de mots (7 thèmes grand public + 4 missions Restaurant)
- `assets/` — icône et vidéo du décompte « 3, 2, 1, pointez ! »
- `manifest.json`, `sw.js` — installation sur l'écran d'accueil et jeu hors ligne
