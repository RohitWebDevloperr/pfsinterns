const API_KEY = 'adc125c568c0414c9d8ffb15a62a57b2';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => fetchNews('India'));

async function fetchNews(query) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '<p>Loading...</p>'; // Show loading state

    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();  // Correctly parse the JSON response
        bindData(data.articles);
    } catch (error) {
        // console.error('Error fetching news:', error);
        cardsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>'; // Show error state
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('cc');

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTittle = cardClone.querySelector('#news-tittle');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDisc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTittle.innerHTML = article.title;
    newsDisc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone: "Asia/Jakarta",
        });

        newsSource.innerHTML = `${article.source.name} . ${date}`;

        



}
let curselectedNav = null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curselectedNav?.Classlist.remove('active');
}




var carsor = document.querySelector(".cursor");
 document.addEventListener("mousemove",function(e){
    carsor.style.cssText = "left: " + e.clientX + "px; top:" + e.clientY + "px;";

 });
