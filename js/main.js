import{getProduits} from "./api.js";
const products = document.getElementById("products")
getProduits().then(function(produits){
    let carte =produits.map(function(produit){
        let card = `
            <div class="bg-white rounded-xl p-4 text-center">
                    <img src="${produit.image}"
                    class="w-full h-40 object-contain">
                    <h3 class="font-semibold mt-2">${produit.nom}</h3>
                    <p class="text-red-600 font-bold">${produit.prix}DH</p>
                    <p>${produit.categorie}</p>
                    <button class="bg-red-600 text-white w-full py-2 rounded mt-2 hover:bg-red-700">Ajouter</button>
            </div>`
        return card
    });
    products.innerHTML = "";
    carte.forEach(function(card) {
    products.innerHTML += card;
    });
});