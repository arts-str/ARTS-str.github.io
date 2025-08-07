
function videoFunctionality() {

const elements = document.querySelectorAll('.element');


elements.forEach(element => {

  const video = element.firstElementChild;
  const muteButton = element.lastElementChild;
  const videoCheck = video.tagName;
  if (videoCheck === 'VIDEO') {
    
    var muteState = false;
    const muteCheck = () =>{
      if (video.muted === false) {
        muteButton.src = 'rsc/UNMUTED.png';
    } else if(video.muted === true){
        muteButton.src = 'rsc/MUTED.png'
    }
    }
    muteCheck();

    muteButton.addEventListener('click',function () {
      if (video.muted === true) {
          muteButton.src = 'rsc/UNMUTED.png';
          video.muted = false;
          muteState = false;
      } else if(video.muted === false){
          muteButton.src = 'rsc/MUTED.png'
          video.muted = true;
          muteState = true;
      }
    });


    video.addEventListener("mouseover", function () {
      this.play()
    })

    video.addEventListener("mouseout", function () {
      this.pause()
    })
    video.addEventListener("touchstart", function () {
      this.play()
    })

    video.addEventListener("touchend", function () {
      this.pause()
    })
  }

})


}


//Agregar efecto de fade in tomando todos los elementos con la clase bloque-texto y element, aplicandole 
//la opacidad en base a si su posición en Y es mayor a la del punto inferior del viewport
const tooltip = document.getElementById('tooltip');


window.addEventListener('scroll', () => {
  if (checkForMobile() === true) {
    var tooltipBound= tooltip.getBoundingClientRect();
    if (tooltipBound.y + tooltipBound.height/2 > 0 && tooltip.style.opacity !== 1) {
      tooltip.style.opacity = '0.8';
      //fadeTooltip(4000);
    }else if (tooltipBound.y < 0 && tooltip.style.opacity !==0){
      tooltip.style.opacity = '0';
    }
  } else {      
      tooltip.style.display = 'none';
  }
  
});


function fadeTooltip(time) {
    setTimeout(() => {
      tooltip.style.opacity = '0';
    }, time);

    setTimeout(() => {
      tooltip.style.display = 'none';
    }, time+500);

}



function checkForMobile(){
  if (innerWidth <= 768) {
    return true;
  } else {
    return false;
  }
}


function loadProyect(n) {
  window.location.href = '/proyecto.html';
}
