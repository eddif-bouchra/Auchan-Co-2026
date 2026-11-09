const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit",function(e){
    e.preventDefault();
    let nom = document.getElementById("nom").value.trim();

    let regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,30}$/;

    if (!regexNom.test(nom)) {
        document.getElementById("erreurNom").textContent =
        "Veuillez saisir un nom valide (3 à 30 caractères).";
    } else {
    document.getElementById("erreurNom").textContent = "";
    }
    console.log("Formolaire soumis");
    let prenom = document.getElementById("prenom").value.trim();

    let regexPrenom = /^(?=(?:.*[A-Za-zÀ-ÖØ-öø-ÿ]){2})[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,30}$/;

    if (!regexPrenom.test(prenom)) {
        document.getElementById("erreurPrenom").textContent =
            "Veuillez saisir un prénom valide.";
    } else {
        document.getElementById("erreurPrenom").textContent = "";
    }
    let email = document.getElementById("email").value.trim();

    let regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!regexEmail.test(email)) {
        document.getElementById("erreurEmail").textContent =
            "Veuillez saisir une adresse email valide.";
    } else {
        document.getElementById("erreurEmail").textContent = "";
    }
    let telephone = document.getElementById("telephone").value.trim();

    let regexTelephone = /^0[67]\d{8}$/;

    if (!regexTelephone.test(telephone)) {
        document.getElementById("erreurTelephone").textContent =
            "Veuillez saisir un numéro marocain valide (06 ou 07).";
    } else {
        document.getElementById("erreurTelephone").textContent = "";
    }
        let sujet = document.getElementById("sujet").value.trim();

    if (sujet === "") {
        document.getElementById("erreurSujet").textContent =
            "Veuillez choisir un sujet.";
    } else {
        document.getElementById("erreurSujet").textContent = "";
    }
    let message = document.getElementById("message").value.trim();

    if (message.length < 10) {
        document.getElementById("erreurMessage").textContent =
            "Le message doit contenir au moins 10 caractères.";
    } else {
        document.getElementById("erreurMessage").textContent = "";
    }
});