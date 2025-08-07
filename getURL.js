function getURL() {
    let url = window.location.search
    let number = url.slice(1)
    loadData(number);
}

var sliderArray = [];
var htmlString = [];

function loadData(n) {
    fetch('proyects.json')
    .then((response) => response.json())
    .then((fileData) => 
        {
            loadMedia(fileData, n)
            
            loadText(fileData, n);
            
            videoFunctionality()
        }
    );
}

function loadMedia(fileData, n) {
    for (let i = 0; i < fileData.proyectos[n].length; i++) {
        sliderArray.push("<a href='#slide-" + i +"'></a>");
        switch (fileData.proyectos[n].types.split(' ')[i]){
                    case "png": 
                        htmlString.push("<img id='slide-"+i+"' src='pryct/"+ fileData.proyectos[n].source + (i+1) +".png'/>");
                        break;
                    case "mp4":
                        htmlString.push("<div class='element'> <video id='slide-"+i+"' loop muted autoplay src='pryct/"+ fileData.proyectos[n].source + (i+1) +".mp4' webkit-playsinline playsinline draggable='false'> </video> <img src='rsc/MUTED.png' class='sound-button'/> </div>");
                        break;
                    case "jpg": //CAMBIAR A JPG
                        htmlString.push("<img id='slide-"+i+"' src='pryct/"+ fileData.proyectos[n].source + (i+1) +".jpg'/>");
                        break;
                        
                    default:
                            console.log("default");
                        break;
                }
        
    }
    if (fileData.proyectos[n].length > 1) {
        document.getElementById('media').innerHTML += `<section class='container'><div class='slider-wrapper'> <div class='slider'> ${htmlString.join(" ")} </div> <div class='slider-nav'> ${sliderArray.join(" ")} </div> </div> </section> <p id='box'></p>`
    } else if (fileData.proyectos[n].length <= 1){
        document.getElementById('media').innerHTML += `<section class='container'>${htmlString.join(" ")} </section> <p id='box'></p>`
    }
}

function loadText(fileData, n) {
    let textBox = document.getElementById('box');
    textBox.innerHTML = fileData.proyectos[n].text;
    let title = document.getElementById('titulo');
    title.innerHTML = fileData.proyectos[n].title;
}

function loadDoc(n){
    window.location.href = "proyecto.html?"+n
}