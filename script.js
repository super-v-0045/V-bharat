const API_KEY="478d5c0e9e2141d68a2d7ea5853b2c9f";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));
async function fetchNews(query){
    try {
        const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            if (res.status === 426) {
                throw new Error('NewsAPI requires HTTPS. Please serve this page over HTTPS or use a local server with SSL.');
            } else {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        const data=await res.json();
        console.log(data);
        if (data.articles) {
            bindData(data.articles);
        } else {
            console.error('No articles found in response');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        alert(error.message); // Display user-friendly message
    }
}
function reload(){
    window.location.reload();
}
function bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");


    cardsContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImage=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDiscription=cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDiscription.innerHTML = article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
}

let currSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navitem;
    currSelectedNav.classList.add('active');
}
function search(){
    var search = document.getElementById("newsQuery").value;
    // alert(search);


    fetchNews(search);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
}


document.addEventListener('DOMContentLoaded', () => {
    const searchButton=document.getElementById("searchBtn");
    const searchText=document.getElementById("newsQuery");

    searchButton.addEventListener('click',()=>{
        const query = searchText.value;
        if(!query) return;

        fetchNews(query);
        currSelectedNav?.classList.remove('active');
        currSelectedNav=null;
    });
});
