

function notizie(){
    for(c in contenuti){
        let box = document.createElement('div');
        box.setAttribute('class', 'sez');
        let titolo = document.createElement('h1');
        let txtT = document.createTextNode(contenuti[c].Titolo);
        let cittaP = document.createElement('p');
        let citta= document.createTextNode(contenuti[c].Citta);
        cittaP.style.display = 'none';
        let link =document.createElement('a');
        link.setAttribute('href', contenuti[c].Link);
        let img = document.createElement('img');
        img.setAttribute('src', contenuti[c].Immagine);
        img.setAttribute('class', 'linkNews');
        let divDe = document.createElement('div');
        divDe.setAttribute('class', 'divDe');
        let descr = document.createElement('span');
        let descrTxt = document.createTextNode(contenuti[c].Descrizione);
        let meteo = document.createElement('div');
        meteo.setAttribute('class', 'meteo');
        meteo.style.display = 'none';

        let dettagli =document.createElement('a');
        dettagli.setAttribute('class', 'botton')
        let iconMe = document.createElement('img');
        iconMe.setAttribute('src', 'Immagini/weather.png')
        let dettagliSez = document.createElement('span');
        dettagliSez.setAttribute('class', 'mostraMeteo');
        let dettagliTxt = document.createTextNode('Mostra meteo');
        

        titolo.appendChild(txtT);
        box.appendChild(titolo);
        cittaP.appendChild(citta);
        box.appendChild(cittaP)
        link.appendChild(img);
        box.appendChild(link);
        descr.appendChild(descrTxt);
        divDe.appendChild(descr);
        box.appendChild(divDe);
        box.appendChild(meteo);

        dettagliSez.appendChild(dettagliTxt);
        dettagli.appendChild(iconMe);
        dettagli.appendChild(dettagliSez);
        dettagli.addEventListener('click', mostraMeteo);
        box.appendChild(dettagli);

        
        weather1.appendChild(box);
    }

}

function mostraMeteo(event){
  
    let citta1 = event.currentTarget.parentNode.querySelector('p').textContent;
    let divMeteo = event.currentTarget.parentNode.querySelector('.meteo');
    let txt = event.currentTarget.parentNode.querySelector('.mostraMeteo');
    console.log(divMeteo);
    if(divMeteo.style.display === 'none'){
        fetch('http://api.weatherstack.com/current' + 
            '?access_key=' + apiKey +
            '&query=' + citta1
        ).then(onResponse, onError).then(json=>{
            console.log(json);
            let icon = document.createElement('img');
            icon.setAttribute('src', json.current.weather_icons);
            let nuvolosita = document.createElement('p');
            let nuvTxt = document.createTextNode('Nuvolosità: ' + json.current.cloudcover + '%');
            let umidita = document.createElement('p');
            let umTxt = document.createTextNode('Umidità: ' + json.current.humidity + '%');
            let Precipitazioni = document.createElement('p');
            let preciTxt = document.createTextNode('Precipitazioni: ' + json.current.precip + '%');

            divMeteo.appendChild(icon);
            nuvolosita.appendChild(nuvTxt);
            divMeteo.appendChild(nuvolosita);
            umidita.appendChild(umTxt);
            divMeteo.appendChild(umidita);
            Precipitazioni.appendChild(preciTxt);
            divMeteo.appendChild(Precipitazioni);

        });
        divMeteo.style.display = '';
        txt.textContent = 'Nascondi Meteo';
    }else{
        divMeteo.style.display = 'none';
        txt.textContent = 'Mostra Meteo';
    }
    
}



function onError(error){
    console.log('Error: ' + error);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }



const apiKey = 'Key per API';
const weather1 = document.querySelector('#weather');
notizie();

