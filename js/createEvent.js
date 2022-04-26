//Grab the current Session and Localstorage
const currentEvent = JSON.parse(sessionStorage.getItem("currentEvent") || ("[]"));
const eventList = JSON.parse(localStorage.getItem("eventlist") || ("[]"));
console.log(currentEvent);

//Adding to the planning Array by saving it to the local storage
//Get all elements to be displayed on the Overview Screen first
document.getElementById('eventTitle').value = currentEvent[0].title;
document.getElementById('streamUrl').value = currentEvent[0].link;
document.getElementById('datum').value = currentEvent[0].date;
document.getElementById('starttime').value = currentEvent[0].startTime;
document.getElementById('endtime').value = currentEvent[0].endTime;

//By creating a new Event all items visible in the overview menu get added to the object and that object gets added to the array
//Array gets pushed to the localStorage and the user will get redirected to the Calendar page
function createNewEvent() {
    let newEvent = {};
    let title = document.getElementById('eventTitle').value;
    let link = document.getElementById('streamUrl').value;
    let startDate = new Date(currentEvent[0].date + 'T'+currentEvent[0].startTime+':00');
    let endDate = new Date(currentEvent[0].date + 'T'+currentEvent[0].endTime+':00');
    let hostApp = document.getElementById('hostApp').value;
    let hostUrl = document.getElementById('hostUrl').value;
    let maxUsers = document.getElementById('maxUsers').value;
    let sceneName = document.getElementById('sceneName').textContent;
    let extraInfo = document.getElementById('extraInfo').value; 
    let ImageSource = document.getElementById('thumbnailsrc').textContent;

    if (!isNaN(startDate.valueOf())) { // valid?
        newEvent = {
          title: title,
          link: link,
          HApp: hostApp,
          start: startDate,
          end: endDate,
          allDay: false,
          Host: hostUrl,
          MUsers: maxUsers,
          SName: sceneName,
          EInfo: extraInfo,
          ImgSrc: ImageSource,
        };
        eventList.push(newEvent);
        localStorage.setItem("eventlist", JSON.stringify(eventList));
        location.href = "http://127.0.0.1:5500/Calendar.html";
      } else {
        alert('Invalid date.');
    }
}