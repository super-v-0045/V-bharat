const API_KEY = "3123db25a06ced3e5c43634208092155";
const BASE_URL = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(
            `${BASE_URL}${query}&lang=en&country=in&max=10&apikey=${API_KEY}`
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        if (Array.isArray(data.articles)) {
            bindData(data.articles);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        alert("Failed to load news");
    }
}

function reload() {
    window.location.reload();
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.image) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImage = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsDesc = cardClone.querySelector("#news-desc");
    const newsSource = cardClone.querySelector("#news-source");

    newsImage.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description || "";

    const date = new Date(article.publishedAt).toLocaleString("en-IN");
    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let currSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = document.getElementById(id);
    currSelectedNav?.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchText = document.getElementById("newsQuery");

    if (searchBtn && searchText) {
        searchBtn.addEventListener("click", () => {
            const query = searchText.value.trim();
            if (!query) return;

            fetchNews(query);
            currSelectedNav?.classList.remove("active");
            currSelectedNav = null;
        });
    }
});
