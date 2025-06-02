const likes = document.querySelectorAll(".like");

likes.forEach((like, index) => {
    const section = like.closest("section");


    const img = section.querySelector("img");
    const id = img.getAttribute("src");


    if (localStorage.getItem(id)) {
        like.classList.add("likeAppuyer");
    }

    like.addEventListener("click", () => {
        like.classList.toggle("likeAppuyer");

        if (like.classList.contains("likeAppuyer")) {
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


let currentContainerIndex = 0;
let countInCurrent = 0;

savedItems.forEach(html => {
    const section = document.createElement("section");
    section.innerHTML = html;


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

const boutonsPanier = document.querySelectorAll(".ajouter-panier");

boutonsPanier.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        const section = bouton.closest("section");
        const img = section.querySelector("img").getAttribute("src");
        const elements = section.querySelectorAll("h4");
        const description = elements[0].textContent;
        const prix = elements[1].textContent;

        const html = `
        <section class="articlePanier">
            <ul>
                <li><img class="photo-panier" src="${img}" /></li>
                <li>
                    <h4>${description}</h4>
                    <h4>${prix}</h4>
                    <h4>Taille : M</h4>
                </li>
            </ul>
            <button class="supprimerPanier">Supprimer</button>
        </section>`;

        let panier = JSON.parse(localStorage.getItem("monPanierHTML")) || [];
        panier.push(html);
        localStorage.setItem("monPanierHTML", JSON.stringify(panier));

    });
});


//-------------------------------------------------------------------


const panierContainer = document.querySelector(".article-via-panier");
const donnees = localStorage.getItem("monPanierHTML");

if (!donnees) {
    panierContainer.innerHTML = "<p>Votre panier est vide.</p>";
} else {
    const articles = JSON.parse(donnees);
    if (articles.length === 0) {
        panierContainer.innerHTML = "<p>Votre panier est vide.</p>";
    } else {
        articles.forEach((html, index) => {
            const affichage = document.createElement("div");
            affichage.innerHTML = html;

            const section = affichage.querySelector("section");
            if (section) {
                panierContainer.appendChild(section);
            }
        });

        document.querySelectorAll(".supprimerPanier").forEach((btn, i) => {
            btn.addEventListener("click", () => {
                const articles = JSON.parse(localStorage.getItem("monPanierHTML")) || [];
                articles.splice(i, 1);
                localStorage.setItem("monPanierHTML", JSON.stringify(articles));
                location.reload();
            });
        });
    }

    
}




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




















