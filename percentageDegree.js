var porcentajeCompletado;
const creditosTotales = 363;
const creditos = 310;

function degreeProgress() {
  const bar = document.getElementById('degreeProgressBarUs');

  porcentajeCompletado = creditos/(creditosTotales/100);
  bar.style.width = porcentajeCompletado + '%';
  countUpPercentaje();
}

var index = 0;
function countUpPercentaje() {
  const percentage = document.getElementById('percentageUs');
  setTimeout(() => {
    percentage.innerHTML = index + '%';
    index++
    if (index <= porcentajeCompletado.toFixed()){
      countUpPercentaje();
    }
  }, 1); 
  
}