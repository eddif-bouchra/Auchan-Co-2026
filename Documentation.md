# Documentation – Sprint II
## Projet : Auchan – Catalogue E-commerce

# 1. Drag and Drop en JavaScript

### Définition
Le Drag and Drop est une fonctionnalité qui permet à l'utilisateur de déplacer un élément avec la souris vers une autre zone.

### Événements principaux
- `dragstart` : déclenché lorsqu'on commence à déplacer un élément.
- `dragover` : déclenché lorsqu'un élément passe au-dessus d'une zone.
- `drop` : déclenché lorsqu'on dépose l'élément.
- `dragend` : déclenché lorsque le déplacement se termine.

### Exemple
```javascript
element.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("text", e.target.id);
});

zone.addEventListener("dragover", function(e) {
    e.preventDefault();
});

zone.addEventListener("drop", function(e) {
    e.preventDefault();
    let id = e.dataTransfer.getData("text");
    console.log(id);
});
```

### Application dans Auchan
Cette fonctionnalité peut être utilisée pour déplacer un produit vers le panier avec Drag and Drop.

# 2. LocalStorage vs SessionStorage

### Définition
LocalStorage et SessionStorage permettent de stocker des données dans le navigateur.

### Différences

| LocalStorage | SessionStorage |
|---|---|
| Les données restent après la fermeture du navigateur. | Les données sont supprimées à la fin de la session de l'onglet. |
| Stockage persistant. | Stockage temporaire. |
| Accessible lors des visites suivantes sur le même site. | Accessible uniquement dans la session de l'onglet concerné. |

### Méthodes principales
- `setItem()` : enregistrer une donnée.
- `getItem()` : récupérer une donnée.
- `removeItem()` : supprimer une donnée.
- `clear()` : supprimer toutes les données du stockage concerné.

### Exemple LocalStorage
```javascript
localStorage.setItem("nom", "Auchan");

let nom = localStorage.getItem("nom");

console.log(nom);
```

### Exemple SessionStorage
```javascript
sessionStorage.setItem("utilisateur", "Client");

let utilisateur = sessionStorage.getItem("utilisateur");

console.log(utilisateur);
```

### Stocker un objet ou un tableau
Le stockage Web conserve des chaînes de caractères. Pour enregistrer un objet ou un tableau, on utilise `JSON.stringify()`.

```javascript
let panier = [
    { id: 1, nom: "Bananes", prix: 12.90 }
];

localStorage.setItem("panier", JSON.stringify(panier));
```

Pour récupérer les données sous leur forme initiale, on utilise `JSON.parse()`.

```javascript
let panierStocke = JSON.parse(localStorage.getItem("panier"));
```

### Application dans Auchan
LocalStorage peut permettre de sauvegarder le panier afin de conserver les produits après l'actualisation de la page.

# 3. Formulaire dynamique avec clonage de nœud

### Définition
Un formulaire dynamique permet d'ajouter ou de supprimer des champs selon les actions de l'utilisateur.

Le clonage de nœud permet de copier un élément HTML existant grâce à `cloneNode()`.

### Méthode cloneNode()
- `cloneNode(true)` : copie l'élément et ses enfants.
- `cloneNode(false)` : copie uniquement l'élément sans ses enfants.

### Exemple
```javascript
let formulaire = document.getElementById("formulaire");
let champ = document.getElementById("champ");

let nouveauChamp = champ.cloneNode(true);

formulaire.appendChild(nouveauChamp);
```

### Affichage des données
Pour récupérer les valeurs d'un formulaire, on peut utiliser `.value`.

```javascript
let nom = document.getElementById("nom").value;

console.log(nom);
```

### Application
Cette technique permet de créer des formulaires avec plusieurs champs ajoutés dynamiquement et d'afficher les informations saisies par l'utilisateur.

# 4. Callback Function

### Définition
Une Callback Function est une fonction passée comme argument à une autre fonction afin d'être exécutée ultérieurement.

### Exemple
```javascript
function afficher(nom, callback) {
    console.log("Bonjour " + nom);
    callback();
}

function terminer() {
    console.log("Opération terminée");
}

afficher("Client", terminer);
```

### Résultat
```text
Bonjour Client
Opération terminée
```

### Application
Les callbacks sont utilisés dans les événements JavaScript et dans les opérations asynchrones, notamment avec `then()` de Fetch.

# 5. Hoisting en JavaScript

### Définition
Le Hoisting est un mécanisme JavaScript qui concerne la déclaration des variables et des fonctions. Le moteur JavaScript traite les déclarations avant l'exécution du code.

### Exemple avec var
```javascript
console.log(age);

var age = 20;
```

Résultat :
```text
undefined
```

La déclaration de `var` est traitée avant son initialisation.

### Exemple avec let et const
```javascript
console.log(nom);

let nom = "Auchan";
```

Ce code provoque une erreur car la variable est dans la Temporal Dead Zone avant son initialisation.

### Exemple avec une fonction déclarée
```javascript
bonjour();

function bonjour() {
    console.log("Bonjour");
}
```

La fonction peut être appelée avant sa déclaration.

# 6. Les objets en JavaScript

### Définition
Un objet est une structure qui permet de regrouper plusieurs informations sous forme de propriétés et de valeurs.

### Exemple
```javascript
let produit = {
    id: 1,
    nom: "Bananes",
    prix: 12.90,
    categorie: "Fruits"
};
```

### Accéder aux propriétés
```javascript
console.log(produit.nom);
console.log(produit["prix"]);
```

### Modifier une propriété
```javascript
produit.prix = 15;
```

### Ajouter une propriété
```javascript
produit.disponible = true;
```

### Supprimer une propriété
```javascript
delete produit.disponible;
```

### Application dans Auchan
Chaque produit du catalogue est représenté par un objet contenant son identifiant, son nom, son prix, sa catégorie et son image.

# 7. Construire une grille responsive avec Tailwind CSS

### Définition
Tailwind CSS est un framework CSS qui permet de construire des interfaces en utilisant des classes utilitaires directement dans le HTML.

### Grid
CSS Grid permet de créer une disposition en lignes et en colonnes.

### Exemple
```html
<div class="grid grid-cols-2 gap-4">
    <div>Produit 1</div>
    <div>Produit 2</div>
    <div>Produit 3</div>
    <div>Produit 4</div>
</div>
```

### Responsive Design
Tailwind utilise des préfixes pour adapter l'affichage selon la largeur de l'écran.

- `sm:` : petit écran.
- `md:` : écran moyen.
- `lg:` : grand écran.
- `xl:` : très grand écran.

### Exemple responsive
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Produits -->
</div>
```

La grille affiche une colonne sur les petits écrans, deux colonnes à partir de `sm` et quatre colonnes à partir de `lg`.

### Application dans Auchan
La grille permet d'afficher les produits du catalogue de manière responsive.

# 8. Fetch et Axios pour récupérer des données externes

### Définition
Fetch et Axios sont deux solutions permettant d'effectuer des requêtes HTTP afin de récupérer ou envoyer des données.

### Fetch
Fetch est une API JavaScript intégrée aux navigateurs.

```javascript
fetch("./data/data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error);
    });
```

### Axios
Axios est une bibliothèque JavaScript qui doit être installée ou importée dans le projet.

```javascript
axios.get("https://api.example.com/produits")
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.log(error);
    });
```

### Différences

| Fetch | Axios |
|---|---|
| API native du navigateur. | Bibliothèque externe. |
| Utilise `response.json()` pour lire du JSON. | Les réponses JSON sont généralement accessibles dans `response.data`. |
| Ne rejette pas automatiquement les erreurs HTTP comme 404 ou 500. | Rejette par défaut les réponses HTTP hors de la plage 2xx. |
| Nécessite une vérification de `response.ok`. | Fournit des informations détaillées sur la réponse et l'erreur. |

### Application dans Auchan
Fetch est utilisé pour récupérer les produits depuis le fichier `data.json`.

# 9. Comprendre l'Event Loop en JavaScript

### Définition
L'Event Loop est un mécanisme qui permet à JavaScript de gérer les opérations asynchrones tout en exécutant le code dans un seul thread principal.

### Les éléments principaux
- **Call Stack** : contient les fonctions en cours d'exécution.
- **Web APIs** : gèrent certaines opérations comme les timers et les événements.
- **Callback Queue** : contient les callbacks prêts à être exécutés.
- **Microtask Queue** : contient notamment les callbacks des Promises.

### Exemple
```javascript
console.log("1");

setTimeout(function() {
    console.log("2");
}, 0);

Promise.resolve().then(function() {
    console.log("3");
});

console.log("4");
```

### Résultat
```text
1
4
3
2
```

### Explication
1. Le code synchrone affiche 1.
2. Le callback de setTimeout est programmé.
3. Le callback de Promise est placé dans la Microtask Queue.
4. Le code synchrone affiche 4.
5. Les microtasks sont exécutées avant les callbacks de la Callback Queue.
6. Le callback de setTimeout affiche 2.

# 10. Gestion des réponses HTTP

### Définition
HTTP est un protocole de communication permettant au client et au serveur d'échanger des informations.

Une réponse HTTP contient notamment un code de statut, des en-têtes et éventuellement un corps de réponse.

### Principaux codes HTTP

| Code | Signification |
|---|---|
| 200 | OK : requête réussie. |
| 201 | Created : ressource créée. |
| 204 | No Content : requête réussie sans contenu. |
| 400 | Bad Request : requête incorrecte. |
| 401 | Unauthorized : authentification nécessaire ou invalide. |
| 403 | Forbidden : accès refusé. |
| 404 | Not Found : ressource introuvable. |
| 500 | Internal Server Error : erreur interne du serveur. |

### Vérifier une réponse avec Fetch
```javascript
fetch("./data/data.json")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }

        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error.message);
    });
```

### Application dans Auchan
La vérification de `response.ok` permet de détecter les erreurs HTTP avant de traiter les données récupérées.

# 11. Introduction aux Progressive Web Apps (PWA)

### Définition
Une Progressive Web App est une application web qui utilise certaines technologies du navigateur pour offrir une expérience proche d'une application mobile ou de bureau.

### Caractéristiques principales
- **Responsive Design** : adaptation aux différentes tailles d'écran.
- **Installabilité** : possibilité d'installer l'application sur un appareil compatible.
- **Offline Support** : possibilité de fonctionner hors connexion grâce au Service Worker et au Cache.
- **Web App Manifest** : fichier qui décrit l'application, son nom, ses icônes et son mode d'affichage.
- **Service Worker** : script qui peut gérer le cache et certaines fonctionnalités réseau en arrière-plan.

### Exemple de Manifest
```json
{
    "name": "Auchan Catalogue",
    "short_name": "Auchan",
    "start_url": "./index.html",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#dc2626",
    "icons": []
}
```

### Application dans Auchan
Le catalogue peut évoluer vers une PWA afin de permettre son installation et l'accès à certaines fonctionnalités hors connexion. Ces fonctionnalités nécessitent une configuration supplémentaire.

# 12. Consommation d'une API avec Fetch JS

### Définition
Une API (Application Programming Interface) permet à une application de communiquer avec un autre service pour récupérer ou envoyer des données.

### Exemple de requête GET
```javascript
fetch("https://api.example.com/produits")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération");
        }

        return response.json();
    })
    .then(function(produits) {
        console.log(produits);
    })
    .catch(function(error) {
        console.log(error);
    });
```

### Les principales méthodes HTTP
- `GET` : récupérer des données.
- `POST` : envoyer ou créer des données.
- `PUT` : remplacer une ressource.
- `PATCH` : modifier partiellement une ressource.
- `DELETE` : supprimer une ressource.

### Application dans Auchan
Le fichier `data.json` représente la source de données locale du catalogue. La fonction `getProduits()` utilise Fetch pour récupérer les produits.

# 13. Synchrone vs Asynchrone : async/await

### Code synchrone
Le code synchrone s'exécute instruction par instruction. Chaque instruction attend la fin de la précédente.

### Code asynchrone
Le code asynchrone permet de lancer une opération sans bloquer l'exécution du reste du programme pendant son attente.

### Exemple avec Promise
```javascript
fetch("./data/data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
```

### Exemple avec async/await
```javascript
async function chargerProduits() {
    try {
        let response = await fetch("./data/data.json");

        if (!response.ok) {
            throw new Error("Erreur HTTP");
        }

        let produits = await response.json();

        console.log(produits);
    } catch (error) {
        console.log(error.message);
    }
}

chargerProduits();
```

### Explication
- `async` : déclare une fonction asynchrone.
- `await` : attend le résultat d'une Promise dans une fonction asynchrone.
- `try` : contient le code à exécuter.
- `catch` : permet de gérer les erreurs.

### Application dans Auchan
Fetch est utilisé avec les Promises (`then`) pour récupérer les produits. La syntaxe `async/await` permet d'écrire cette opération d'une autre manière.
