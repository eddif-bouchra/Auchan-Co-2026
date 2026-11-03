export function getProduits(){
    return fetch("./data/data.json")
    .then(function(response){
        return response.json();
    });
}