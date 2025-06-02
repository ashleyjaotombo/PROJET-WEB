const likes = document.querySelectorAll(".like");

likes.forEach((like, index) => {
    const section = like.closest("section");
    const img = section.querySelector("img");
    const id = img.getAttribute("src");

    if (localStorage.getItem("favori-" + id)) {
        like.classList.add("likeAppuyer");
    }

    like.addEventListener("click", () => {
        like.classList.toggle("likeAppuyer");

        if (like.classList.contains("likeAppuyer")) {
            localStorage.setItem("favori-" + id, section.outerHTML);
        } else {
            localStorage.removeItem("favori-" + id);
        }
    });
});

const articlesContainers = document.querySelectorAll(".articlefavoris");
const savedItems = Object.entries(localStorage).filter(([key, value]) => key.startsWith("favori-"));

let currentContainerIndex = 0;
let countInCurrent = 0;

savedItems.forEach(([key, html]) => {
    if (!html.includes("likeAppuyer")) return;
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

const articleLike = document.querySelectorAll(".likeAppuyer");

articleLike.forEach((article) => {
    const section = article.closest("section");
    const img = section.querySelector("img");
    const id = img.getAttribute("src");
    article.addEventListener("click", () => {
        section.style.transition = "transform 0.6s ease";
        section.style.transform = "translateX(-1000px)";
        localStorage.removeItem("favori-" + id);
        article.classList.remove("likeAppuyer");
        setTimeout(() => {
            location.reload();
        }, 500);
    });
});

const boutonsPanier = document.querySelectorAll(".ajouter-panier");

boutonsPanier.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        const section = bouton.closest("section");
        const img = section.querySelector("img").getAttribute("src");
        const elements = section.querySelectorAll("h4");
        const description = elements[0].textContent;
        const prix = elements[1].textContent;

        const article = {
            identifiant: "panier-article",
            html: `
                <section class=\"articlePanier\">
                    <ul>
                        <li><img class=\"photo-panier\" src=\"${img}\" /></li>
                        <li>
                            <h4>${description}</h4>
                            <h4>${prix}</h4>
                            <h4>Taille : M</h4>
                        </li>
                    </ul>
                    <button class=\"supprimerPanier\">Supprimer</button>
                </section>`
        };

        let panier = JSON.parse(localStorage.getItem("monPanierHTML")) || [];
        panier.push(article);
        localStorage.setItem("monPanierHTML", JSON.stringify(panier));
        location.reload();
    });
});

const panierContainer = document.querySelector(".article-via-panier");
const donnees = localStorage.getItem("monPanierHTML");

if (panierContainer) {
    panierContainer.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.classList.add("bloc-panier");
    if (!donnees) {
        wrapper.innerHTML = "<p>Votre panier est vide.</p>";
    } else {
        const articles = JSON.parse(donnees).filter(a => a.identifiant === "panier-article");
        if (articles.length === 0) {
            wrapper.innerHTML = "<p>Votre panier est vide.</p>";
        } else {
            articles.forEach((obj, index) => {
                const affichage = document.createElement("div");
                affichage.innerHTML = obj.html;
                const section = affichage.querySelector("section.articlePanier");
                if (section) {
                    wrapper.appendChild(section);
                }
            });

            document.querySelectorAll(".supprimerPanier").forEach((btn, i) => {
                btn.addEventListener("click", () => {
                    const articles = JSON.parse(localStorage.getItem("monPanierHTML")) || [];
                    const filtrés = articles.filter(a => a.identifiant === "panier-article");
                    filtrés.splice(i, 1);
                    localStorage.setItem("monPanierHTML", JSON.stringify(filtrés));
                    location.reload();
                });
            });
        }
    }
    panierContainer.appendChild(wrapper);
}
