let index = 0;

function carousel(){
    
    for(a in contenuti){
        index++;
        let boxCar = document.createElement('div');
        boxCar.setAttribute('class', 'carouselBox fade');
        let number = document.createElement('div');
        number.setAttribute('class', 'numbertext');
        let txt = document.createElement('h1');        
        let numberT = document.createTextNode(contenuti[a].Titolo);
        let linkVid = document.createElement('a');
        linkVid.setAttribute('href', contenuti[a].Link);
        let imgBox = document.createElement('img');
        imgBox.setAttribute('src', contenuti[a].Immagine);
        let descriz = document.createElement('div');
        descriz.setAttribute('class', 'desCaros');
        let txt1 = document.createTextNode(contenuti[a].Descrizione);
        let dot = document.createElement('span');
        dot.setAttribute('class', 'dot');
        
        
        txt.appendChild(numberT);
        number.appendChild(txt);
        boxCar.appendChild(number);
        linkVid.appendChild(imgBox);
        boxCar.appendChild(linkVid);
        descriz.appendChild(txt1);
        boxCar.appendChild(descriz);
        sezCaro.appendChild(boxCar);
        divDots.appendChild(dot);
    } 
}

let slideIndex = 0;

function showSlides(){
    let slides = document.querySelectorAll('.carouselBox');
    let dots = document.querySelectorAll('.dot')
    
    for (let i = 0; i<slides.length; i++){
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if(slideIndex > slides.length){
        slideIndex = 1;
    }

    for(i = 0; i<dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }
    let less = slideIndex -1;

    console.log(slides);
    slides[less].style.display = "flex";  
    dots[less].className += " active";
    setTimeout(showSlides, 4500);
}



function creaBoxVid(video){
    for(c of video){
        let box = document.createElement("div");
        box.setAttribute('class', 'goria');
        let title = document.createElement('h1');
        let textTitle = document.createTextNode(c.snippet.title);
        console.log(c.snippet.title);
        console.log(c.snippet.thumbnails.default.url);
        title.appendChild(textTitle);
        box.appendChild(title);
        let clickImg = document.createElement('a');
        let image = document.createElement("img");
        image.setAttribute('src', c.snippet.thumbnails.medium.url);
        clickImg.appendChild(image);
        clickImg.setAttribute('href', 'https://www.youtube.com/watch?v=' + c.id.videoId)
        box.appendChild(clickImg);
        let details = document.createElement('div');
        details.setAttribute('class', 'dettagli');
        let txtAgg = document.createElement('a');
        let icon = document.createElement("img");
        icon.setAttribute('src', RIGHT_ARROW);
        txtAgg.appendChild(icon);
        let span = document.createElement("span");
        let textSpan = document.createTextNode('Mostra di più');
        span.appendChild(textSpan);
        txtAgg.appendChild(span);
        let descr = document.createElement("p");
        let textP = document.createTextNode(c.snippet.description);
        descr.appendChild(textP);
        descr.style.display = 'none';
        details.appendChild(descr);
        details.appendChild(txtAgg);
                
        box.appendChild(details);
        sezVid.appendChild(box);
        txtAgg.addEventListener('click', onclick);
    }

}

function onclick(event){
    let paragr = event.currentTarget.parentNode.querySelector('p');
    let text = event.currentTarget.parentNode.querySelector('.dettagli span');
    let img = event.currentTarget.parentNode.querySelector('.dettagli img');
    if(paragr.style.display === 'none'){
        paragr.style.display = "";
        text.textContent = 'Mostra di meno';
        img.setAttribute('src', DOWN_ARROW);
    }else{
        paragr.style.display = "none";
        text.textContent = 'Mostra di più';
        img.setAttribute('src', RIGHT_ARROW);
    }
    
}



function onJson(json){
    console.log('JSON ricevuto');
    const library = document.querySelector('#sezVideo');
    library.innerHTML = '';
    
    console.log(json.items);
    
    creaBoxVid(json.items);

}

function onError(error){
    console.log('Error: ' + error);
}

function onResponse(response){
    console.log('Risposta ricevuta');

    return response.json();
}


function search1(event){
    event.preventDefault();

    const sVid = document.querySelector('#casella');
    const sVid_value = encodeURIComponent(sVid.value);
    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC5G6kTnHXDz0WIBC2VGBOqg&type=video&maxResults=6&q=' + sVid_value,
        {
            method: "GET",
        headers:
        
            {
                'Authorization': 'Bearer ' + myParam,
                'Accept': 'application/json'
            }      
        }
).then(onResponse, onError).then(onJson);
}
let myParam = location.hash.split('access_token=')[1].split('&')[0];




const RIGHT_ARROW = 'Immagini/syt.png';
const DOWN_ARROW = 'Immagini/up1.png';

const sezCaro = document.querySelector('#carouselVid');
const divDots = document.querySelector('#divDot');
const sezVid = document.querySelector('#sezVideo');
const form = document.querySelector('form');
carousel();
showSlides();
form.addEventListener('submit', search1);