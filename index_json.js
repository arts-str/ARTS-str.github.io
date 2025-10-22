const container = document.getElementById('photos');
function loadData() {
    fetch('proyects.json')
    .then((response) => response.json())
    .then((fileData) => 
        {
            let collumnArray = returnTercios(fileData.proyectos);
            console.log(collumnArray);
            for (const collumn of collumnArray) {
                container.insertAdjacentHTML('beforeend', createCollumn(returnElements(collumn[0], collumn[1])));
                videoFunctionality();
            }
            
        }
    );
}
loadData();

function createElement(object, index) {
    console.log(object, index);
    
    const img = `<img class="image" draggable="false" onclick="loadDoc(${index})" src="pryct/${object.source}${object.prefered_media}" alt="">`
    const video = `<video  webkit-playsinline playsinline class="image" draggable="false" onclick="loadDoc(${index})" loop> 
                            <source src="pryct/${object.source}${object.prefered_media}#t=0.001" type="video/mp4">
                            Tu navegador no soporta la reproducción de vídeo mp4.
                    </video>
                    <img src="rsc/UNMUTED.png" class="sound-button"/>`
    let media = "";
    
    switch (object.types.split(' ')[0]) {
        case "png":
        case "jpg":
            media = img;
            break;

        case "mp4":
            media = video;
            break;
    
        default:
            break;
    }
    
    return `<div class="element">
                ${media}
            </div>`
}

function returnElements(objects, startPos) {
    let elementos = [];
    for (let i = startPos; i < objects.length+startPos; i++) {
        elementos.push(createElement(objects[i-startPos], i));        
    }
    return elementos.join("");
}

function createCollumn(elements) {
    return `<div class="collumn">
                <div class="photo">
                    ${elements}
                </div>
            </div>`
}


function returnTercios(objects) {
    let tercio = Math.round((objects.length-1)/3);
            let a = tercio;
            let rest;
            if (tercio < objects.length) {
                rest = objects.length - tercio*3;
                a += rest;            
            }
            let collumnAPos = [0, a];
            let collumnBPos = [a, a+tercio];
            let collumnCPos = [a+tercio, a+tercio*2];
            let collumnA = [objects.slice(collumnAPos[0], collumnAPos[1]), collumnAPos[0]];
            let collumnB = [objects.slice(collumnBPos[0], collumnBPos[1]), collumnBPos[0]];
            let collumnC = [objects.slice(collumnCPos[0], collumnCPos[1]), collumnCPos[0]];
            return [collumnA, collumnB, collumnC];
}