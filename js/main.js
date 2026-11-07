import{getProduits} from "./api.js";
const titre = document.getElementById("titre");
const description = document.getElementById("description")
const products = document.getElementById("products");
const recherche = document.getElementById("recherche");
const grille = document.getElementById("btnGrille");
const listeBtn = document.getElementById("btnListe");
const categories = document.querySelectorAll("[data-categorie]");
const pagination = document.getElementById("pagination");

getProduits().then(function(produits){
    let categActuelle = "";
    let produitparPage = 8 ;
    let pageActuel = 1;
    function afficheProduit(liste){
        let debut = (pageActuel - 1) * (produitparPage);
        let fin = debut + produitparPage;
        let produitsPage = liste.slice(debut,fin);
        let carte =produitsPage.map(function(produit){
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
        pagination.innerHTML ="";
        if(liste.length === 0){
            products.innerHTML = "<p>Aucun produit trouvé.</p>";
            return;
        }
        carte.forEach(function(card) {
        products.innerHTML += card;
    
        });
        function affichePagination(){
        let nombrePage = Math.ceil(liste.length / produitparPage);
        pagination.innerHTML ="";
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
        suivant.textContent = "Suivant";
        suivant.className = "bg-gray-200 px-3 py-1 rounded";
        suivant.addEventListener("click", function(){
        if(pageActuel < nombrePage){
        pageActuel++;
        afficheProduit(liste);
    }
});
        pagination.appendChild(suivant);
        let précédent = document.createElement("button");
        précédent.textContent="précédent";
        précédent.classList = "bg-gray-200 px-3 py-1 rounded";
        précédent.addEventListener("click",function(){
            if(pageActuel > 1){
                pageActuel--;
                afficheProduit(liste);
            }
        });
        pagination.appendChild(précédent);
        
    }; 

        affichePagination();
        grille.addEventListener("click",function(){
            products.className = "grid grid-cols-2 lg:grid-cols-4 gap-4"
        })
        listeBtn.addEventListener("click",function(){
            products.className = "flex flex-col gap-3 p-4"
        })
}
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

});

