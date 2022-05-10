//Retrieved Saved Events
let eventList = JSON.parse(localStorage.getItem("eventlist") || ("[]"));
let newEvent = [];

//Instantiate the Calendar
//Specific Calendar options are loaded
//Custom Calendar Header with custom buttons
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      height: window.innerHeight,
      events: [],
      aspectRatio: 1,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      eventClick: function(info) {
        document.getElementById("eventName").innerHTML = info.event.title;
        document.getElementById("eventStartTime").innerHTML = info.event.start;
        document.getElementById("eventEndTime").innerHTML = info.event.end;
        document.getElementById("maxUsers").innerHTML = info.event._def.extendedProps.MUsers;
        document.getElementById("hostApp").innerHTML = info.event._def.extendedProps.HApp;
        document.getElementById("extraInfo").innerHTML = info.event._def.extendedProps.EInfo;
        document.getElementById("infoImg").src = info.event._def.extendedProps.ImgSrc;

        newEvent = {
          title: info.event.title,
          link: info.event._def.extendedProps.link,
          HApp: info.event._def.extendedProps.HApp,
          datum: info.event._def.extendedProps.datum,
          startTijd: info.event._def.extendedProps.startTijd,
          eindTijd: info.event._def.extendedProps.eindTijd,
          start: info.event.start,
          end: info.event.end,
          allDay: false,
          Host: info.event._def.extendedProps.Host,
          MUsers: info.event._def.extendedProps.MUsers,
          SName: info.event._def.extendedProps.SName,
          EInfo: info.event._def.extendedProps.EInfo,
          ImgSrc: info.event._def.extendedProps.ImgSrc,
        };
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

//Setting the Inital Data for an Event
//Data not yet defiend will be empty
function getDate() {
    //Get input field of Date and Timers
    newEvent = {};
    const title = document.getElementById('title').value;
    const link = document.getElementById('streamlink').value;
    const datum = document.getElementById('date').value;
    const startTijd = document.getElementById('starttime').value;
    const eindTijd = document.getElementById('endtime').value;
    let startDate = new Date(datum + 'T'+startTijd+':00');

    //Put values into Object and put Object into the array
    if (!isNaN(startDate.valueOf())) { // valid?
      newEvent = {
        title: title,
        link: link,
        HApp: '',
        datum: datum,
        startTijd: startTijd,
        eindTijd: eindTijd,
        start: '',
        end: '',
        allDay: false,
        Host: '',
        MUsers: '',
        SName: '',
        EInfo: '',
        ImgSrc: '',
      };
      pushNewEvent();
    } else {
      alert('Invalid date.');
    }
}

//Push the new event to the Event that is currently being worked on 
//
function pushNewEvent() {
  sessionStorage.setItem("newEvent", JSON.stringify(newEvent));
  location.href = "http://127.0.0.1:5500/create.html";
}

//Activate the new Event window
function Eon() {
  document.getElementById("NewEventPromt").style.display = "block";
}
  
function Eoff() {
  document.getElementById("NewEventPromt").style.display = "none";
}