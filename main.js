
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
