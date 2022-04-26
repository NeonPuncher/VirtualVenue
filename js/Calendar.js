//Retrieved Saved Events
const eventList = JSON.parse(localStorage.getItem("eventlist") || ("[]"));
const currentEvent = [];
console.log(eventList)

//Instantiate the Calendar
//Specific Calendar options are loaded
//Custom Calendar Header with custom buttons
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      height: 720,
      events: [],
      aspectRatio: 1,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'addEventButton'
      },
      eventClick: function(info) {
        document.getElementById("eventName").innerHTML = info.event.title;
        document.getElementById("eventStartTime").innerHTML = info.event.start;
        document.getElementById("eventEndTime").innerHTML = info.event.end;
        document.getElementById("maxUsers").innerHTML = info.event._def.extendedProps.MUsers
        document.getElementById("hostApp").innerHTML = info.event._def.extendedProps.HApp
        document.getElementById("extraInfo").innerHTML = info.event._def.extendedProps.EInfo;
        console.log(info.event._def.extendedProps)
        document.getElementById("infoImg").src = info.event._def.extendedProps.ImgSrc;
      },    
      customButtons: {
        addEventButton: {
          text: '+ New Event',
          click: function() {
            Eon();
          }
        },
        refetchEvents: {
          //If there is no refresh, This shit aint dynamic
          text: 'refetch',
          click: function() {
            calendar.removeAllEvents();
            calendar.addEventSource(eventList);
          }
        },
      }
    });
    calendar.addEventSource(eventList);
    calendar.render();
  });

function getDate() {
    //Get input field of Date and Timers
    let newEvent = {};
    const eventTitle = document.getElementById('title').value;
    const streamLink = document.getElementById('streamlink').value;
    const datum = document.getElementById('date').value;
    const startTime = document.getElementById('starttime').value;
    const endTime = document.getElementById('endtime').value;
    let startDate = new Date(datum + 'T'+startTime+':00');
    let endDate = new Date(datum + 'T'+endTime+':00');

    //Put values into Object and put Object into the array
    if (!isNaN(startDate.valueOf())) { // valid?
      newEvent = {
        title: eventTitle,
        date: datum,
        startTime: startTime,
        endTime: endTime,
        link: streamLink,
        allDay: false,
      };
      currentEvent.push(newEvent);
      sessionStorage.setItem("currentEvent", JSON.stringify(currentEvent));
      location.href = "http://127.0.0.1:5500/create.html";
    } else {
      alert('Invalid date.');
    }
}

//Activate the new Event window
function Eon() {
  document.getElementById("NewEventPromt").style.display = "block";
}
  
function Eoff() {
  document.getElementById("NewEventPromt").style.display = "none";
}