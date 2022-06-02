//Retrieved Saved Events
let eventList = JSON.parse(localStorage.getItem("eventlist") || ("[]"));
let newEvent = [];

//Get username
let UserName = JSON.parse(sessionStorage.getItem("Username") || ("[]"));
console.log(UserName);

//Instantiate the Calendar
//Specific Calendar options are loaded
//Custom Calendar Header with custom buttons
//Outside accessible variables
let SelectedEventName = '';
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      scrollTime: '18:00:00',
      height: window.innerHeight,
      selectable: true,
      selectOverlap: false,
      unselectAuto: false,
      nowIndicator: true,
      events: [],
      aspectRatio: 1,
      headerToolbar: {
        left: 'dayGridMonth,timeGridWeek prev,next',
        center: 'title',
        right: 'addEventButton'
      },
      eventClick: function(info) {
        document.getElementById("eventName").innerHTML = info.event.title;
        document.getElementById("planner").innerHTML = info.event._def.extendedProps.planner;
        document.getElementById("eventStartTime").innerHTML = info.event._def.extendedProps.startTijd +" / "+ info.event._def.extendedProps.datum;
        document.getElementById("eventEndTime").innerHTML = info.event._def.extendedProps.eindTijd +" / "+ info.event._def.extendedProps.datum;
        document.getElementById("maxUsers").innerHTML = info.event._def.extendedProps.MUsers;
        document.getElementById("hostApp").innerHTML = info.event._def.extendedProps.HApp;
        document.getElementById("extraInfo").innerHTML = info.event._def.extendedProps.EInfo;
        document.getElementById("infoImg").src = info.event._def.extendedProps.ImgSrc;
        document.getElementById("Status").value = info.event._def.extendedProps.Status;
        document.getElementById("EditBtn").style.display = "block";
        
        SelectedEventName = info.event.title;
        console.log(SelectedEventName);

        newEvent = {
          title: info.event.title,
          planner: UserName,
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
          SkyBox: info.event._def.extendedProps.SkyBox,
          BannerImg: info.event._def.extendedProps.BannerImg,
          Status: info.event._def.extendedProps.Status,
          backgroundColor: info.event.eventBackgroundColor,
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
      },
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
        planner: UserName,
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
        SkyBox: '',
        BannerImg: '',
        Status: 'In Progress',
        backgroundColor: '#edc40e',
      };
      sessionStorage.setItem("newEvent", JSON.stringify(newEvent));
      location.href = "http://127.0.0.1:5500/create.html";
    } else {
      alert('Invalid date.');
    }
}

//Push the new event to the Event that is currently being worked on 
function pushNewEvent() {
  sessionStorage.setItem("newEvent", JSON.stringify(newEvent));
  var index = eventList.map(function(e) { return e.title; }).indexOf(SelectedEventName);
  eventList.splice(index, 1);
  localStorage.setItem("eventlist", JSON.stringify(eventList));
  location.href = "http://127.0.0.1:5500/create.html";
}

function changeStatus() {
  var index = eventList.map(function(e) { return e.title; }).indexOf(SelectedEventName);

  eventList[index].Status = document.getElementById('Status').value;
  //IEWL IF STATEMENTS HAAL WEG LATER NU NIET  //IEWL IF STATEMENTS HAAL WEG LATER NU NIET  //IEWL IF STATEMENTS HAAL WEG LATER NU NIET
  if(eventList[index].Status == 'Completed')
  {
    eventList[index].backgroundColor = '#2abf54';
  }
  if(eventList[index].Status == 'In Progress')
  {
    eventList[index].backgroundColor = '#edc40e';
  }
  if(eventList[index].Status == 'Vrijhouden'){
    eventList[index].backgroundColor = '#fff173';
  }
  if(eventList[index].Status == 'Awaiting Approval')
  {
    eventList[index].backgroundColor = '#0e6fed';
  }
  if(eventList[index].Status == 'Cancelled')
  {
    eventList[index].backgroundColor = '#bf2a2a';
  }
  localStorage.setItem("eventlist", JSON.stringify(eventList));
  console.log(eventList[index])
  location.href = "http://127.0.0.1:5500/Calendar.html";
}


//Activate the new Event window
function Eon() {
  document.getElementById("NewEventPromt").style.display = "block";
}
  
function Eoff() {
  document.getElementById("NewEventPromt").style.display = "none";
}