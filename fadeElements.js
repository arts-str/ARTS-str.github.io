
//Agregar efecto de fade in tomando todos los elementos con la clase bloque-texto y element, aplicandole 
//la opacidad en base a si su posición en Y es mayor a la del punto inferior del viewport
const bloqueDeTextoCollection = document.querySelectorAll('.bloque-texto');
const imageCollection = document.querySelectorAll('.element');


var wHeight = window.innerHeight;

window.addEventListener('resize', ()=>{
  wHeight = window.innerHeight;
})

window.addEventListener('scroll', () => {
  imageCollection.forEach(element => {
    var elementBound = element.getBoundingClientRect();
    if (elementBound.y < wHeight && element.style.opacity !== 1) {
      element.style.opacity = '1';
    }else if (elementBound.y > wHeight && element.style.opacity !==0){
      element.style.opacity = '0';
    }
  });
  bloqueDeTextoCollection.forEach(element => {
    var elementBound= element.getBoundingClientRect();
    if (elementBound.y < wHeight && element.style.opacity !== 1) {
      element.style.opacity = '1';
    }else if (elementBound.y > wHeight && element.style.opacity !==0){
      element.style.opacity = '0';
    }

    //if (elementBound.y + elementBound.height/2 > 0 && element.style.opacity !== 1) {
    //  element.style.opacity = '1';
    //}else if (elementBound.y < 0 && element.style.opacity !==0){
    //  element.style.opacity = '0';
    //}
  });
  
});