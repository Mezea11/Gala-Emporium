import { adminId, formData } from "./login.js";
var allEvents = [];
export default async function admin() {
    
    console.log(adminId);
    
    const response = await fetch('/api/clubs/'+ adminId)
    const result = await response.json()

    console.log('hello world')
    //let clubArray = [];
    
    //let clubArray = result.map(data => data._id);
    let clubArray;
    if (Array.isArray(result)) {
        clubArray = result.map(data => data._id);
    } else {
        clubArray = [result._id];
    }
    console.log(clubArray);
    
    // Fetch event data for all clubs concurrently
    const eventPromises = clubArray.map(clubId => fetch('/api/events/' + clubId));
    const eventResponses = await Promise.all(eventPromises);
    const eventResults = await Promise.all(eventResponses.map(response => response.json()));

    // eventResults is now an array of event data for each club
    console.log(eventResults);
    let myClubs = '';

    for (let i = 0; i < result.length; i++) {
        let data = result[i];

        myClubs += `
        <option value="${data._id}">${data.club_name}</option>
        `;   
    }
    
    let myEvent = '';

    
    for (let i = 0; i < eventResults.length; i++) {
        let eventsForClub = eventResults[i];
        
        for (let j = 0; j < eventsForClub.length; j++) {
            let data = eventsForClub[j];
            allEvents.push(data);
            myEvent += `
            <option value="${data._id}">${data.title}</option>
            `;
            //console.log(myEvent);
        }
        
    }

    return `
        <section id="admin-container">
            <button onclick="logOut();">Log out</button>
            <section id="create-event-container">
                <h1>Create new event here:</h1>
                <form id="newEventForm" onsubmit="postEvent(); return false" >
                    <input type="text" name="eventTitle" placeholder="Enter event title">
                    <input type="text" name="eventDescription" placeholder="Describe the event">
                    <label for="eventDate">Event Date:</label>
                    <input type="date" id="eventDate" name="eventDate">
                    <label for="eventTime">Event Time:</label>
                    <input type="time" id="eventTime" name="eventTime">
                    <select id="choose-club" name="clubId">
                        ${myClubs}
                    </select>
                    <!-- date and time -->
                    <input type="number" name="tickets" placeholder="Enter amount of bookable tickets">
                    
                    <button type="submit">Create new event!</button>
                </form>
            </section>
            
            <article class="event-container-admin">
                
            </article>
            
            <form id="updateEventform" onsubmit="submitUpdate(); return false">
                <label for="events">Välj evenemang:</label>
                <select id="choose-event" name="eventId" onchange="populateForm();">
                    ${myEvent}
                </select>
                <input type="text" id="title-input" name="title" placeholder="Event name">
                <input type="text" id="description-input" name="description" placeholder="Event description">
                <label for="eventDate">Event Date:</label>
                    <input type="date" id="eventDateUp" name="eventDate">
                    <label for="eventTime">Event Time:</label>
                    <input type="time" id="eventTimeUp" name="eventTime">
                <select id="choose-clubUp" name="clubId">
                    ${myClubs}
                </select>

                <input type="number" name="tickets" id="ticketsUp" placeholder="Enter amount of bookable tickets">
                <button type="submit">Update event!</button>
                <button type="button" onclick="deleteEvent();">Delete Event</button>
            </form>
        </section>
    `
}

async function populateForm() {
    let selectedEventId = $('#choose-event').val();
    
    const selectedEvent = allEvents.find(event => event._id === selectedEventId);
    console.log(selectedEvent);
    if (selectedEvent) {
        $('#title-input').val(selectedEvent.title);
        $('#description-input').val(selectedEvent.description);
        let date = new Date (selectedEvent.date);
        console.log(date);
        let dateString = date.getFullYear().toString().padStart(4, '0') + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
        let timeString = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
        $('#eventDateUp').val(dateString);
        $('#eventTimeUp').val(timeString);
        $('#choose-clubUp').val(selectedEvent.clubId);
        $('#ticketsUp').val(selectedEvent.available_tickets);
    }
}

async function logOut() {
        const response = await fetch('/api/login', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

    window.location.href = '/#login';
    console.log("hopefully we will log out...")
};

async function submitUpdate() {
    let form = $( '#updateEventform' );

    let eventId = $('#choose-event').val();

    console.log(eventId);

    var title = form.find('[name="title"]').val();
    var description = form.find('[name="description"]').val();
    var clubId = form.find('[name="clubId"]').val();
    var tickets = form.find('[name="tickets"]').val();
    var eventDate = form.find('[name="eventDate"]').val();
    var eventTime = form.find('[name="eventTime"]').val();
    var date = new Date(eventDate + ' ' + eventTime);

    if (!title || !description || !eventDate || !eventTime || !tickets) {
        console.error("Title or description is empty");
        return;
    }

    let formData = {
        title: title,
        description: description,
        clubId: clubId,
        date: date,
        available_tickets: tickets
    }

    try {
        const response = await fetch('/api/events/' + eventId, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
 
        if (!response.ok) {
            throw new Error('Failed to submit event');
        }
 
        $('#confirmEvent').show();
        console.log('Event successfully updated');
        
    } catch (error) {
        console.error('Error updating event:', error);
    }
    console.log(formData);
 }

 async function deleteEvent() {

    let eventId = $('#choose-event').val();
    console.log("deleteEvent button was clicked.")

    try {
        const response = await fetch('/api/events/' + eventId, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete event');
        }

        $('#confirmEvent').show();
        console.log('Event successfully deleted');

        // Optionally, update the UI to reflect the deletion
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}

async function postEvent() {

    let form = $( '#newEventForm' );

    var title = form.find('[name="eventTitle"]').val();
    var description = form.find('[name="eventDescription"]').val();
    var clubId = form.find('[name="clubId"]').val();
    var tickets = form.find('[name="tickets"]').val();
    var eventDate = form.find('[name="eventDate"]').val();
    var eventTime = form.find('[name="eventTime"]').val();
    var date = new Date(eventDate + ' ' + eventTime);

   if (!title || !description || !eventDate || !eventTime || !tickets) {
        console.error("Title or description is empty");
        return;
    }

   let formData = {
        title: title,
        description: description,
        clubId: clubId,
        date: date,
        available_tickets: tickets
    }

   try {
       const response = await fetch('/api/events', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });

       if (!response.ok) {
           throw new Error('Failed to submit event');
       }

       $('#confirmEvent').show();
       console.log('Event submitted successfully');
   } catch (error) {
       console.error('Error submitting event:', error);
   }
   console.log(formData);
}


window.populateForm = populateForm;
window.submitUpdate = submitUpdate;
window.postEvent = postEvent;
window.deleteEvent = deleteEvent;
window.logOut = logOut;