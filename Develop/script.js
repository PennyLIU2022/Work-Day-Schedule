// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let schedule = localStorage.schedule ? JSON.parse(localStorage.schedule):
 [ {'Hour':'9AM', 'Schedule':'' },
   {'Hour':'10AM', 'Schedule':'' },
   {'Hour':'11AM', 'Schedule':'' },
   {'Hour':'12PM', 'Schedule':'' },
   {'Hour':'1PM', 'Schedule':'' },
   {'Hour':'2PM', 'Schedule':'' },
   {'Hour':'3PM', 'Schedule':'' },
   {'Hour':'4PM', 'Schedule':'' },
   {'Hour':'5PM', 'Schedule':'' },
 ]
 const scheduleEl = document.querySelector("#schedule");
 var alertEl = document.querySelector("#alert")

// set and show current time under header
var timeDisplayEl = $('#currentDay');
function displayTime() {
  var currentTime = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(currentTime);
}

// Creat div for each item in schedule array
function showschedule(){
  scheduleEl.innerHTML='';
  schedule.forEach(function(item,index) {
    scheduleEl.innerHTML+=`<div class="row time-block">
    <div class="col-2 col-md-1 hour text-center py-3" class="hour">  ${item.Hour}
    </div>

    <textarea id="${index}" class="${getTime(item)} col-8 col-md-10 description" onfocus="this.select()">
    ${item.Schedule}</textarea>

    <div class="saveBtn col-2 col-md-1">
      <i class="fas fa-save" onClick='saveschedule(event)'></i>
    </div>

    </div>`
  });
}

showschedule();

function getTime(item){
  let currentTime = dayjs().hour(12);    // get current hour
  console.log(currentTime);
  let scheduleTime = Number(item.Hour.slice(0,-2));// Numeric time on schedule
  let scheduleTimeAMPM = item.Hour.substr(-2);// AM/PM of time on schedule
  let convertedTime;
  //convert time-block to 24-hours format
  if(scheduleTimeAMPM == "AM"){
      convertedTime = scheduleTime;
  }else{
      convertedTime = scheduleTime+12;
  }
  //reutrn class name based on currentTime
  if(convertedTime<currentTime) return 'past';
  else if(convertedTime==currentTime) return 'present';
  else if(convertedTime>currentTime) return 'future';
}

function saveschedule(event){
  event.preventDefault();
  let textArea = event.target.parentElement.parentElement.childNodes[3];
  let idx = textArea.id;
  // save input to schedule
  schedule[idx].Schedule = textArea.value;
  // save to local storage
  localStorage.schedule = JSON.stringify(schedule);
  alert("The new schedule is added to the local storage!")
  showSchedule();
}

displayTime();
setInterval(displayTime, 1000);
