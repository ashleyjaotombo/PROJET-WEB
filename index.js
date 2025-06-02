const likes = document.querySelectorAll(".like");

likes.forEach((like, index) => {
    const section = like.closest("section");

    // Identifiant unique basé sur l'image
    const img = section.querySelector("img");
    const id = img.getAttribute("src");

    // Charger l'état depuis localStorage
    if (localStorage.getItem(id)) {
        like.classList.add("likeAppuyer");
    }

    like.addEventListener("click", () => {
        like.classList.toggle("likeAppuyer");

        if (like.classList.contains("likeAppuyer")) {
            // Sauvegarde du HTML du produit
            localStorage.setItem(id, section.outerHTML);
        } else {
            localStorage.removeItem(id);
        }
    });
})


//------------------------------------------------------------------------------------------------
const articlesContainers = document.querySelectorAll(".articlefavoris");

// Récupérer tous les favoris.css stockés
const savedItems = Object.values(localStorage);

// Insérer les articles dans les blocs .articles (4 max chacun)
let currentContainerIndex = 0;
let countInCurrent = 0;

savedItems.forEach(html => {
    const section = document.createElement("section");
    section.innerHTML = html;

    // Sauter les balises imbriquées <section> dans <section>
    const clean = section.querySelector("section");
    const finalSection = clean ? clean : section;

    if (countInCurrent >= 4) {
        currentContainerIndex++;
        countInCurrent = 0;
    }

    const target = articlesContainers[currentContainerIndex];
    if (target) {
        target.appendChild(finalSection);
        countInCurrent++;
    }
});

//---------------------------------------------------------------------------------------


const articleLike=document.querySelectorAll(".likeAppuyer");

articleLike.forEach((article)=>{
    const section=article.closest("section");
    const img=section.querySelector("img");
    const id=img.getAttribute("src");
    article.addEventListener("click", ()=>{
        section.style.transition="transform 0.6s ease";
        section.style.transform="translateX(-1000px)";
        localStorage.removeItem(id);
        article.classList.remove("likeAppuyer");
        setTimeout(() => {
            location.reload();
        }, 500);
    });
});



//------------------------------------------------------------------------------------
const recherche=document.getElementById("panneauRecherche");
const fermeButton=document.getElementById("closeRecherche");
const entreRecherche=document.getElementById("saisieRecherche");
const lancerRecherche=document.getElementById("ouvrirRecherche");

lancerRecherche.addEventListener("click", ()=>{
    recherche.classList.add("panneauOuvert");
});

fermeButton.addEventListener("click", ()=>{
    recherche.classList.remove("panneauOuvert");
});




//---------------------------------------------------------------------------------------
const ajoutPanier=document.querySelectorAll()


