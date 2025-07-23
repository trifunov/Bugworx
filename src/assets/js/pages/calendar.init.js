/*
Template Name: Upzet - Responsive Bootstrap 5 Admin Dashboard
Author: Themesdesign
Version: 1.1.0
Website: https://themesdesign.in/
File: calendar Init Js File
*/

!function ($) {
    "use strict";

    var CalendarPage = function () { };

    CalendarPage.prototype.init = function () {

        var addEvent = new bootstrap.Modal(document.getElementById('event-modal'), {
            keyboard: false
        });
        document.getElementById('event-modal');
        var modalTitle = document.getElementById('modal-title');
        var formEvent = document.getElementById('form-event');
        var selectedEvent = null;
        var forms = document.getElementsByClassName('needs-validation');
        /* initialize the calendar */

        var date = new Date();
        var newEventData= null;
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var Draggable = FullCalendar.Draggable;
        var externalEventContainerEl = document.getElementById('external-events');
        var defaultEvents = [{
            title: 'All Day Event',
            start: new Date(y, m, 1)
        },
        {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2),
            className: 'bg-warning'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d - 3, 16, 0),
            allDay: false,
            className: 'bg-info'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d + 4, 16, 0),
            allDay: false,
            className: 'bg-primary'
        },
        {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
            className: 'bg-success'
        },
        {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false,
            className: 'bg-danger'
        },
        {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false,
            className: 'bg-success'
        },
        {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/',
            className: 'bg-dark'
        }];

        // init draggable
        new Draggable(externalEventContainerEl, {
            itemSelector: '.external-event',
            eventData: function (eventEl) {
                return {
                    id: Math.floor(Math.random() * 11000),
                    title: eventEl.innerText,
                    allDay: true,
                    start: new Date(),
                    className: eventEl.getAttribute('data-class')
                };
            }
        });

        var calendarEl = document.getElementById('calendar');

        function addNewEvent(info) {
            document.getElementById('form-event').reset();
            document.getElementById('btn-delete-event').setAttribute('hidden', true);
            addEvent.show();
            formEvent.classList.remove("was-validated");
            formEvent.reset();
            selectedEvent = null;
            modalTitle.innerText = 'Add Event';
            newEventData = info;
            document.getElementById("edit-event-btn").setAttribute("data-id", "new-event");
            // document.getElementById('edit-event-btn').click();
            document.getElementById("edit-event-btn").setAttribute("hidden", true);
        }

        function getInitialView() {
            if (window.innerWidth >= 768 && window.innerWidth < 1200) {
                return 'timeGridWeek';
            } else if (window.innerWidth <= 768) {
                return 'listMonth';
            } else {
                return 'dayGridMonth';
            }
        }


        var calendar = new FullCalendar.Calendar(calendarEl, {
            timeZone: 'local',
            editable: true,
            droppable: true,
            selectable: true,
            navLinks: true,
            initialView: getInitialView(),
            themeSystem: 'bootstrap',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            },
            windowResize: function (view) {
                var newView = getInitialView();
                calendar.changeView(newView);
            },
            eventResize: function (info) {
                var indexOfSelectedEvent = defaultEvents.findIndex(function (x) {
                    return x.id == info.event.id
                });
                if (defaultEvents[indexOfSelectedEvent]) {
                    defaultEvents[indexOfSelectedEvent].title = info.event.title;
                    defaultEvents[indexOfSelectedEvent].start = info.event.start;
                    defaultEvents[indexOfSelectedEvent].end = (info.event.end) ? info.event.end : null;
                    defaultEvents[indexOfSelectedEvent].allDay = info.event.allDay;
                    defaultEvents[indexOfSelectedEvent].className = info.event.classNames[0];
                    defaultEvents[indexOfSelectedEvent].description = (info.event._def.extendedProps.description) ? info.event._def.extendedProps.description : '';
                    defaultEvents[indexOfSelectedEvent].location = (info.event._def.extendedProps.location) ? info.event._def.extendedProps.location : '';
                }
                // upcomingEvent(defaultEvents);
            },
            eventClick: function (info) {
                document.getElementById("edit-event-btn").removeAttribute("hidden");
                document.getElementById('btn-save-event').setAttribute("hidden", true);
                document.getElementById("edit-event-btn").setAttribute("data-id", "edit-event");
                document.getElementById("edit-event-btn").innerHTML = "Edit";
             
                addEvent.show();
                formEvent.reset();
                selectedEvent = info.event;

                // First Modal
                document.getElementById("modal-title").innerHTML = "Edit Eevent";
                // Edit Modal
                document.getElementById("event-title").value = selectedEvent.title; document.getElementById("eventid").value = selectedEvent.id;
                document.getElementById('event-category').value = selectedEvent.className;
                console.log("selectedEvent",info)
                // 

               
                newEventData = null;
                modalTitle.innerText = selectedEvent.title;

                // formEvent.classList.add("view-event");
                document.getElementById('btn-delete-event').removeAttribute('hidden');
            },
            dateClick: function (info) {
                addNewEvent(info);
                document.getElementById('btn-save-event').removeAttribute("hidden");
            },
            events: defaultEvents,
            eventReceive: function (info) {
                var newid = parseInt(info.event.id);
                var newEvent = {
                    id: newid,
                    title: info.event.title,
                    start: info.event.start,
                    allDay: info.event.allDay,
                    className: info.event.classNames[0]
                };
                defaultEvents.push(newEvent);
                // upcomingEvent(defaultEvents);
            },
            eventDrop: function (info) {
                var indexOfSelectedEvent = defaultEvents.findIndex(function (x) {
                    return x.id == info.event.id
                });
                if (defaultEvents[indexOfSelectedEvent]) {
                    defaultEvents[indexOfSelectedEvent].title = info.event.title;
                    defaultEvents[indexOfSelectedEvent].start = info.event.start;
                    defaultEvents[indexOfSelectedEvent].end = (info.event.end) ? info.event.end : null;
                    defaultEvents[indexOfSelectedEvent].allDay = info.event.allDay;
                    defaultEvents[indexOfSelectedEvent].className = info.event.classNames[0];
                    defaultEvents[indexOfSelectedEvent].description = (info.event._def.extendedProps.description) ? info.event._def.extendedProps.description : '';
                    defaultEvents[indexOfSelectedEvent].location = (info.event._def.extendedProps.location) ? info.event._def.extendedProps.location : '';
                }
                // upcomingEvent(defaultEvents);
            }
        });

        calendar.render();

        // upcomingEvent(defaultEvents);
        /*Add new event*/
        // Form to add new event
        formEvent.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var updatedTitle = document.getElementById("event-title").value;
            var updatedCategory = document.getElementById('event-category').value;
            var start_date = new Date();
            var updateStartDate = start_date;
            var end_date = null;
            var eventid = document.getElementById("eventid").value;
            var all_day = false;
            if (start_date.length > 1) {
                var end_date = new Date(start_date[1]);
                end_date.setDate(end_date.getDate() + 1);
                start_date = new Date(start_date[0]);
                all_day = true;
            } 
            var e_id = defaultEvents.length + 1;

            // validation
            if (forms[0].checkValidity() === false) {
                forms[0].classList.add('was-validated');
            } else {
                if (selectedEvent) {
                    selectedEvent.setProp("id", eventid);
                    selectedEvent.setProp("title", updatedTitle);
                    selectedEvent.setProp("classNames", [updatedCategory]);
                    selectedEvent.setStart(selectedEvent.start);
                    selectedEvent.setAllDay(all_day);
                    var indexOfSelectedEvent = defaultEvents.findIndex(function (x) {
                        return x.id == selectedEvent.id
                    });
                    if (defaultEvents[indexOfSelectedEvent]) {
                        defaultEvents[indexOfSelectedEvent].title = updatedTitle;
                        defaultEvents[indexOfSelectedEvent].start = selectedEvent.start;
                        defaultEvents[indexOfSelectedEvent].allDay = all_day;
                        defaultEvents[indexOfSelectedEvent].className = updatedCategory;
                    }
                    calendar.render();
                    // default
                } else {
                    console.log("add updatedCategory",updatedCategory)
                    var newEvent = {
                        id: e_id,
                        title: updatedTitle,
                        start: newEventData.date,
                        // end: end_date,
                        allDay: all_day,
                        className: updatedCategory,
                        // description: eventDescription,
                        // location: event_location
                    };
                    calendar.addEvent(newEvent);
                    defaultEvents.push(newEvent);
                    newEventData = null;
                }
                addEvent.hide();
                // upcomingEvent(defaultEvents);
            }
        });

        document.getElementById("btn-delete-event").addEventListener("click", function (e) {
            if (selectedEvent) {
                for (var i = 0; i < defaultEvents.length; i++) {
                    if (defaultEvents[i].id == selectedEvent.id) {
                        defaultEvents.splice(i, 1);
                        i--;
                    }
                }
                // upcomingEvent(defaultEvents);
                selectedEvent.remove();
                selectedEvent = null;
                addEvent.hide();
            }
        });
        document.getElementById("btn-new-event").addEventListener("click", function (e) {
            flatpicekrValueClear();
            flatPickrInit();
            addNewEvent();
            document.getElementById("edit-event-btn").setAttribute("data-id", "new-event");
            document.getElementById('edit-event-btn').click();
            document.getElementById("edit-event-btn").setAttribute("hidden", true);
        }); 
        // upcoming Event
// function upcomingEvent(a) {
//     a.sort(function (o1, o2) {
//         return (new Date(o1.start)) - (new Date(o2.start));
//     });
//     document.getElementById("upcoming-event-list").innerHTML = null;
//     Array.from(a).forEach(function (element) {
//         var title = element.title;
//         if (element.end) {
//             endUpdatedDay = new Date(element.end);
//             var updatedDay = endUpdatedDay.setDate(endUpdatedDay.getDate() - 1);
//           }
//         var e_dt = updatedDay ? updatedDay : undefined;
//         if (e_dt == "Invalid Date" || e_dt == undefined) {
//             e_dt = null;
//         } else {
//             const newDate = new Date(e_dt).toLocaleDateString('en', { year: 'numeric', month: 'numeric', day: 'numeric' });
//             e_dt = new Date(newDate)
//               .toLocaleDateString("en-GB", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//               })
//               .split(" ")
//               .join(" ");
//         }
//         var st_date = element.start ? str_dt(element.start) : null;
//         var ed_date = updatedDay ? str_dt(updatedDay) : null;
//         if (st_date === ed_date) {
//             e_dt = null;
//         }
//         var startDate = element.start;
//         if (startDate === "Invalid Date" || startDate === undefined) {
//             startDate = null;
//         } else {
//             const newDate = new Date(startDate).toLocaleDateString('en', { year: 'numeric', month: 'numeric', day: 'numeric' });
//             startDate = new Date(newDate)
//               .toLocaleDateString("en-GB", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//               })
//               .split(" ")
//               .join(" ");
//         }

//         var end_dt = (e_dt) ? " to " + e_dt : '';
//         var category = (element.className).split("-");
//         var description = (element.description) ? element.description : "";
//         var e_time_s = tConvert(getTime(element.start));
//         var e_time_e = tConvert(getTime(updatedDay));
//         if (e_time_s == e_time_e) {
//             var e_time_s = "Full day event";
//             var e_time_e = null;
//         }
//         var e_time_e = (e_time_e) ? " to " + e_time_e : "";

//         u_event = "<div class='card mb-3'>\
//                         <div class='card-body'>\
//                             <div class='d-flex mb-3'>\
//                                 <div class='flex-grow-1'><i class='mdi mdi-checkbox-blank-circle me-2 text-" + category[2] + "'></i><span class='fw-medium'>" + startDate + end_dt + " </span></div>\
//                                 <div class='flex-shrink-0'><small class='badge badge-soft-primary ms-auto'>" + e_time_s + e_time_e + "</small></div>\
//                             </div>\
//                             <h6 class='card-title fs-16'> " + title + "</h6>\
//                             <p class='text-muted text-truncate-two-lines mb-0'> " + description + "</p>\
//                         </div>\
//                     </div>";
//         document.getElementById("upcoming-event-list").innerHTML += u_event;
//     });
// };

    },
        //init
        $.CalendarPage = new CalendarPage, $.CalendarPage.Constructor = CalendarPage
}(window.jQuery),

    //initializing 
    function ($) {
        "use strict";
        $.CalendarPage.init()
    }(window.jQuery);