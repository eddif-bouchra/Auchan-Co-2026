export function sauvgardrPanier(panierProduits){
   localStorage.setItem("panier", JSON.stringify(panierProduits));
}
export function chargerPanier(){
    let panierSauvgarde = localStorage.getItem("panier");
    if(panierSauvgarde){
        return JSON.parse(panierSauvgarde);
    }else{
        return [];
    }
}