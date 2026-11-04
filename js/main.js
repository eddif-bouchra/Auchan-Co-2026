import{getProduits} from "./api.js";
const titre = document.getElementById("titre");
const description = document.getElementById("description")
const products = document.getElementById("products");
const recherche = document.getElementById("recherche");
const categories = document.querySelectorAll("[data-categorie]");
const tableau = document.getElementById("tableau");

getProduits().then(function(produits){
    let categActuelle = "";
    function afficheProduit(liste){
        let carte =liste.map(function(produit){
            let card = `
                <div class="bg-white rounded-xl p-4 text-center">
                        <img src="${produit.image}"
                        class="w-full h-40 object-contain">
                        <h3 class="font-semibold mt-2">${produit.nom}</h3>
                        <p class="text-red-600 font-bold">${produit.prix}DH</p>
                        <p>${produit.categorie}</p>
                        <button class="bg-red-600 text-white w-full py-2 rounded mt-2 hover:bg-red-700">Ajouter</button>
                </div>`
            return card;
        });
        products.innerHTML = "";
        carte.forEach(function(card) {
        products.innerHTML += card;
        });
}
    function FiltrProduit(){
    afficheProduit(produits);
    recherche.addEventListener("input", function(){
    let resultat = recherche.value.toLowerCase().trim();
    let produitFiltrer = produits.filter(function(element){
        return element.nom.toLowerCase().includes(resultat) && (categActuelle === "" || element.categorie === categActuelle);
    });
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
        afficheProduit(proFilter);
    });
});
    }
    FiltrProduit();

});

