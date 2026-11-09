import{getProduits} from "./api.js";
import { sauvgardrPanier,chargerPanier } from "./storage.js";
const titre = document.getElementById("titre");
const description = document.getElementById("description")
const products = document.getElementById("products");
const recherche = document.getElementById("recherche");
const grille = document.getElementById("btnGrille");
const listeBtn = document.getElementById("btnListe");
const categories = document.querySelectorAll("[data-categorie]");
const pagination = document.getElementById("pagination");
const panier = document.getElementById("panier");

getProduits().then(function(produits){
    let categActuelle = "";
    let panierProduits = chargerPanier();
    let produitparPage = 8 ;
    let pageActuel = 1;
    let modeAffichage ="grille";
    let produitsActuels = produits;
    function afficheProduit(liste){
        let debut = (pageActuel - 1) * (produitparPage);
        let fin = debut + produitparPage;
        let produitsPage = liste.slice(debut,fin);
        let carte = produitsPage.map(function(produit){

        if (modeAffichage === "liste") {
        return `
            <tr draggable="true" data-id="${produit.id}" class="product-card border-b">
                <td>${produit.nom}</td>
                <td>
                    <img src="${produit.image}" class="w-20 h-20 object-contain">
                </td>
                <td>${produit.prix} DH</td>
                <td>
                    <button class="bg-red-600 text-white px-3 py-1 rounded">
                        Ajouter
                    </button>
                </td>
            </tr>
            
        `;
        }

        else {
        return `
            <div draggable="true" data-id="${produit.id}" class="product-card bg-white rounded-xl p-4 text-center">
                <img src="${produit.image}" class="w-full h-40 object-contain">
                <h3 class="font-semibold mt-2">${produit.nom}</h3>
                <p class="text-red-600 font-bold">${produit.prix}DH</p>
                <p>${produit.categorie}</p>
                <button class="bg-red-600 text-white w-full py-2 rounded mt-2 hover:bg-red-700">Ajouter</button>
            </div>
        `;
        }
});
        products.innerHTML = "";
            if (modeAffichage === "liste") {
        products.className = "w-full min-w-0";
        } else {
        products.className = "w-full min-w-0 grid grid-cols-2 md:grid-cols-4 gap-4";
        }
        pagination.innerHTML ="";
        if(liste.length === 0){
            products.innerHTML = "<p>Aucun produit trouvé.</p>";
            return;
        }
        if (modeAffichage === "liste") {

            products.innerHTML = `
            <table class="w-full bg-white">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Image</th>
                        <th>Prix</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="tableauProduits"></tbody>
            </table>
            `;

        const tableauProduits = document.getElementById("tableauProduits");

        carte.forEach(function(card) {
            tableauProduits.innerHTML += card;
        });

        }else {

        carte.forEach(function(card) {
            products.innerHTML += card;
        });

        }
        const cartes = products.querySelectorAll(".product-card");
        cartes.forEach(function(carte){
            carte.addEventListener("dragstart",function(e){
                e.dataTransfer.setData("text/plain",carte.dataset.id);
            });
        });
        const btnAjout = products.querySelectorAll(".product-card button");
        btnAjout.forEach(function(bouton){
            bouton.addEventListener("click",function(){
                let idProduit = bouton.closest(".product-card").dataset.id;
                ajouterauPanier(idProduit);
            });
        });
        function affichePagination(){
        let nombrePage = Math.ceil(liste.length / produitparPage);
        pagination.innerHTML ="";
        let précédent = document.createElement("button");
        précédent.textContent = "← Précédent";
        précédent.className = "bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition";

        précédent.addEventListener("click", function(){
            if(pageActuel > 1){
                pageActuel--;
                afficheProduit(liste);
            }
        });

        pagination.appendChild(précédent);
        
        for(let i =1;i<=nombrePage;i++){
            let btn = document.createElement("button");
            btn.textContent = i;
            if(i === pageActuel){
                btn.className = "bg-red-600 text-white px-3 py-1 rounded";
            }
            else{
                btn.className = "bg-gray-200  px-3 py-1 rounded";
            }
            pagination.appendChild(btn);
            btn.addEventListener("click",function(){
                    pageActuel=i;
                    afficheProduit(liste);
                
            });
        }
        let suivant = document.createElement("button");
        suivant.textContent = "→ Suivant";
        suivant.className = "bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition";
        suivant.addEventListener("click", function(){
        if(pageActuel < nombrePage){
        pageActuel++;
        afficheProduit(liste);
    }
});
        pagination.appendChild(suivant);
        
          
    }; 
    affichePagination();
    }

    grille.addEventListener("click",function(){
         modeAffichage = "grille";
        afficheProduit(produitsActuels);
    });

    listeBtn.addEventListener("click",function(){
    modeAffichage = "liste";
    afficheProduit(produitsActuels);
});

    function FiltrProduit(){
    afficheProduit(produits);
    recherche.addEventListener("input", function(){
    let resultat = recherche.value.toLowerCase().trim();
    let produitFiltrer = produits.filter(function(element){
        return element.nom.toLowerCase().includes(resultat) && (categActuelle === "" || element.categorie === categActuelle);
    });
    pageActuel = 1;
    afficheProduit(produitFiltrer);
})
    categories.forEach(function (element){
    element.addEventListener("click",function(e){
        e.preventDefault();
        categActuelle = this.dataset.categorie;
        titre.textContent = categActuelle;
        if(categActuelle === "Fruits"){
            description.textContent = "Des fruits frais et de qualité, au meilleur prix.";
        }
        else if (categActuelle === "Légumes"){
            description.textContent = "Des légumes frais et de qualité, au meilleur prix.";
        }
        else if (categActuelle === "Boissons"){
             description.textContent = "Découvrez nos produits boissons.";
        }
        else if (categActuelle === "Epicerie"){
            description.textContent = "Découvrez nos produits epicerie.";
        }
        else if (categActuelle === "Hygiéne"){
            description.textContent = "Découvrez nos produits d'hygiène.";
        }
        let resultat = recherche.value.toLowerCase().trim();
        let proFilter = produits.filter(function(element){
            return element.nom.toLowerCase().includes(resultat)&& element.categorie === categActuelle;
        });
        pageActuel = 1;
        afficheProduit(proFilter);
    });
});
    }
    FiltrProduit();
    panier.addEventListener("dragover",function(e){
        e.preventDefault();
    });
     panier.addEventListener("drop",function(e){
            e.preventDefault();
            let idProduit = e.dataTransfer.getData("text/plain");
            let produitChoisi = produits.find(function(produit){
                return produit.id == idProduit;
                
            });
            let produitExist = panierProduits.find(function(element){
                    return element.id == idProduit;
                });
                if(produitExist){
                    produitExist.quantite++;
                }else{
                    panierProduits.push({
                        id: produitChoisi.id,
                        nom:produitChoisi.nom,
                        prix:produitChoisi.prix,
                        quantite:1
                    });
                }
            sauvgardrPanier(panierProduits);
            affichePanier();
            console.log(produitChoisi);
            console.log(idProduit);
        });
        function ajouterauPanier(idProduit){
            let produitChoisi = produits.find(function(produit){
                return produit.id == idProduit;
            });
            let produitExist = panierProduits.find(function(element){
                return element.id == idProduit;
            });
            if(produitExist){
                produitExist.quantite++;
            }else{
                panierProduits.push({
                id: produitChoisi.id,
                nom: produitChoisi.nom,
                prix: produitChoisi.prix,
                quantite: 1
        });
        }
        sauvgardrPanier(panierProduits);
        affichePanier();
        }
        function affichePanier(){
            panier.innerHTML = "";
            let total = panierProduits.reduce(function(acc ,element){
                return acc + (element.prix * element.quantite);
            },0);
            panierProduits.forEach(function(element){
                panier.innerHTML += `
                <div>
                <p>${element.nom}</p>
                <p>Prix unitaire : ${element.prix}DH</p>
                <span class="bg-gray-100 px-4 py-2 rounded-lg font-semibold">
                    ${element.quantite}
                </span>
                <p>prix total : ${element.prix * element.quantite}DH</p>
                <button data-action="plus" data-id="${element.id}" class="bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-lg font-bold">+</button>
                <button data-action="moins" data-id="${element.id}"class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-9 h-9 rounded-lg font-bold" >-</button>
                <button data-action="supprimer" data-id="${element.id}" class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold">Supprimer</button>
                </div>`;
            });
            panier.innerHTML += `
            <p class = "font-bold text-lg">Total général : ${total}DH</p>`;
            panier.querySelectorAll("button").forEach(function(bouton){
                bouton.addEventListener("click",function(){
                    let idProduit = bouton.dataset.id;
                    let action = bouton.dataset.action;
                    let produit = panierProduits.find(function(element){
                        return element.id == idProduit;
                    });
                    if (action === "plus") {
                        produit.quantite++;
                    }
                    else if(action === "moins"){
                        if(produit.quantite > 1){
                            produit.quantite--;
                        }
                    }
                    else if(action === "supprimer"){
                        panierProduits = panierProduits.filter(function(element){
                            return element.id != idProduit;
                        });
                    }
                    sauvgardrPanier(panierProduits);
                    affichePanier();
                });
            });
        }
        affichePanier();

});

