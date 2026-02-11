document.addEventListener("DOMContentLoaded", () => {
  const timeElement = document.getElementById('time');

  const dayNames = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"];
  const monthNames = ["Ene", "Feb", "Marz", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];

  let timeout;

  function startTime() {
    const today = new Date();
    let day = today.getDay();
    let dayN = today.getDate();
    let month = today.getMonth();
    let h = today.getHours();
    let m = checkTime(today.getMinutes());

    timeElement.textContent =
      dayNames[day] + " " + dayN + " " + monthNames[month] + " " + h + ":" + m;

    timeout = setTimeout(startTime, 1000);
  }

  function startTimeSmall() {
    const today = new Date();
    let h = today.getHours();
    let m = checkTime(today.getMinutes());

    timeElement.textContent = h + ":" + m;
    timeout = setTimeout(startTimeSmall, 1000);
  }

  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

  function decideTime() {
    clearTimeout(timeout);

    if (!isIOSMode()) {
      startTime();
    } else {
      startTimeSmall();
    }
  }

  window.addEventListener("resize", decideTime);

  decideTime();
});
