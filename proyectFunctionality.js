
function videoFunctionality() {
    console.log('videoOn')
    
    const elements = document.querySelectorAll('.element');
    
    elements.forEach(element => {
    
      const video = element.firstElementChild;
      const muteButton = element.lastElementChild;
      const videoCheck = video.tagName;
      console.log(videoCheck);
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
    
    
        video.addEventListener("click", function () {
          if (video.paused === true) {
            video.play()
          } else {
            video.pause()
          }

          
        })
      }
    
    })
    
}
