import{getProduits} from "./api.js";
getProduits().then(function(produits){
    console.log(produits)
});