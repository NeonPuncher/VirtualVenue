  let header = document.getElementById('listHeader');
  let headerBts = header.getElementsByClassName('headerBtn');
  for (let i = 0; i < headerBts.length; i++) {
    headerBts[i].addEventListener('click', function(){
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    })    
  }
  
  function on() {
    document.getElementById("overlay").style.width = "32vw";
    document.getElementById("overlay-content").style.display = "block";
    OverviewOff();
  }
  
  function off() {
    document.getElementById("overlay").style.width = "0vw";
    document.getElementById("overlay-content").style.display = "none";
  }

  function OverviewOn() {
    document.getElementById("overview").style.width = "32vw";
    document.getElementById("overview-content").style.display = "block";
    off();
  }
  
  function OverviewOff() {
    document.getElementById("overview").style.width = "0vw";
    document.getElementById("overview-content").style.display = "none";
  }

  function ShowStages() {
    off();
    OverviewOff();
  }

  function CustomOn() {
    document.getElementById("customizePage").style.display = "block";
  }

  function CustomOff() {
    document.getElementById("customizePage").style.display = "none";
  }

  function Calendar() {
    location.href = "http://127.0.0.1:5500/Calendar.html";
  }

  function TestStage() {
    location.href = "http://127.0.0.1:5500/create.html";
  }

  function LogOut() {
    location.href = "http://127.0.0.1:5500/index.html";
  }

  function ReqeustStage() {
    alert('open mailbox');
  }