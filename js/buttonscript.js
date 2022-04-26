function on() {
    document.getElementById("overlay").style.width = "35vw";
    document.getElementById("overlay-content").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.width = "0vw";
    document.getElementById("overlay-content").style.display = "none";
  }

  function CustomOn() {
    document.getElementById("customizePage").style.display = "block";
  }

  function CustomOff() {
    document.getElementById("customizePage").style.display = "none";
  }

  function OverviewOn() {
    document.getElementById("overview").style.width = "35vw";
    document.getElementById("overview-content").style.display = "block";
  }
  
  function OverviewOff() {
    document.getElementById("overview").style.width = "0vw";
    document.getElementById("overview-content").style.display = "none";
  }

  function Calendar() {
    location.href = "http://127.0.0.1:5500/Calendar.html";
  }