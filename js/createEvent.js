//Grab the current Session and Localstorage
let newEvent = JSON.parse(sessionStorage.getItem("newEvent") || ("[]"));
const eventList = JSON.parse(localStorage.getItem("eventlist") || ("[]"));
console.log(newEvent);

//Adding to the planning Array by saving it to the local storage
//Get all elements to be displayed on the Overview Screen first
document.getElementById('eventName').innerHTML = newEvent.title;
document.getElementById('eventTitle').value = newEvent.title;
document.getElementById('streamUrl').value = newEvent.link;
document.getElementById('datum').value = newEvent.datum;
document.getElementById('starttime').value = newEvent.startTijd;
document.getElementById('endtime').value = newEvent.eindTijd;
document.getElementById('hostApp').value = newEvent.HApp;
document.getElementById('hostUrl').value = newEvent.Host;
document.getElementById('maxUsers').value = newEvent.MUsers;
document.getElementById('sceneName').textContent = newEvent.SName;
document.getElementById('extraInfo').value = newEvent.EInfo;
document.getElementById('thumbnailsrc').textContent = newEvent.thumbnailsrc;

//By creating a new Event all items visible in the overview menu get added to the object and that object gets added to the array
//Array gets pushed to the localStorage and the user will get redirected to the Calendar page
function createNewEvent() {
    let title = document.getElementById('eventTitle').value;
    let link = document.getElementById('streamUrl').value;
    let datum = document.getElementById('datum').value;
    let startTijd = document.getElementById('starttime').value;
    let eindTijd = document.getElementById('endtime').value;
    let startDate = new Date(datum + 'T'+newEvent.startTijd+':00');
    let endDate = new Date(datum + 'T'+newEvent.eindTijd+':00');
    let hostApp = document.getElementById('hostApp').value;
    let hostUrl = document.getElementById('hostUrl').value;
    let maxUsers = document.getElementById('maxUsers').value;
    let sceneName = document.getElementById('sceneName').textContent;
    let extraInfo = document.getElementById('extraInfo').value; 
    let ImageSource = document.getElementById('thumbnailsrc').textContent;
    let Status = 'In Progress';
    let StatusColor = '#edc40e'

    if (sceneName == '' || hostUrl == '' || hostApp == ''){
      Status = 'In Progress'
      StatusColor = '#edc40e'
    } else {
      Status = 'Awaiting Approval'
      StatusColor = '#0e6fed'
    }    

    if (!isNaN(startDate.valueOf())) { // valid?
      newEvent = {
        id: newEvent.id,
        title: title,
        link: link,
        HApp: hostApp,
        datum: datum,
        startTijd: startTijd,
        eindTijd: eindTijd,
        start: startDate,
        end: endDate,
        allDay: false,
        Host: hostUrl,
        MUsers: maxUsers,
        SName: sceneName,
        EInfo: extraInfo,
        ImgSrc: ImageSource,
        Status: Status,
        backgroundColor: StatusColor,
      };
      eventList.push(newEvent);
      localStorage.setItem("eventlist", JSON.stringify(eventList));
      location.href = "http://127.0.0.1:5500/Calendar.html";
    } else {
      alert('Invalid date.');
    }
}