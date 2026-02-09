const timeElement = document.getElementById('time');

const dayNames = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"];

const monthNames = ["Ene", "Feb", "Marz", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
function startTime() {
  const today = new Date();
  let day = today.getDay();
  let dayN = today.getDate();
  let month = today.getMonth();
  let h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  timeElement.textContent = dayNames[day] + " " + dayN + " " + monthNames[month] + " " +  h + ":" + m;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
startTime()