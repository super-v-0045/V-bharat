const API_KEY="478d5c0e9e2141d68a2d7ea5853b2c9f";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
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
    newsDiscription.innerHTML =article.description

    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML=`$(article.source.name) . $(date)`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
}

let currSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    currSelectedNav?.classlist.remove('active');
    currSelectedNav.classlist.add('active');
}
function search(){
    var search = document.getElementById("newsQuery").value;
    // alert(search);


    fetchNews(search);
    const navitem=document.getElementById(id);
    currSelectedNav?.classlist.remove('active');
    currSelectedNav.classlist.add('active');
}


const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");


searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return; 

    fetchNews(query);
    currSelectedNav?.classlist.remove('active');
    currSelectedNav=null;
}) 