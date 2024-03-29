//import variables
import { adminId, formData } from './login.js';
//delcare global array to store fetched events
var allEvents = [];
export default async function admin() {
    const response = await fetch('/api/clubs/' + adminId);
    const result = await response.json();

    console.log('You have logged in as: ' + adminId);

    let clubArray;
    if (Array.isArray(result)) {
        clubArray = result.map((data) => data._id);
    } else {
        clubArray = [result._id];
    }
    console.log(clubArray);

    // Fetch event data for all clubs concurrently
    const eventPromises = clubArray.map((clubId) =>
        fetch('/api/events/' + clubId)
    );
    const eventResponses = await Promise.all(eventPromises);
    const eventResults = await Promise.all(
        eventResponses.map((response) => response.json())
    );

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
            <button onclick="logOut();" id="log-out-btn">Log out</button>
            <section id="create-event-container">
                <h1>Create new event here:</h1>
                <form id="newEventForm" onsubmit="postEvent(); return false" >
                    <input type="text" name="eventTitle" placeholder="Enter event title">
                    <input type="text" name="eventDescription" placeholder="Describe the event" id="event-description">
                    <label for="eventDate">Event Date:</label>
                    <input type="date" id="eventDate" name="eventDate">
                    <label for="eventTime">Event Time:</label>
                    <input type="time" id="eventTime" name="eventTime">
                    <select id="choose-club" name="clubId">
                        ${myClubs}
                    </select>
                    <!-- date and time -->
                    <input type="number" name="tickets" placeholder="Enter amount of bookable tickets">
                    
                    <button type="submit">Create new event</button>
                    <p id="confirmEvent">A new event has been added!</p>
                </form>

            </section>

            <section id="update-event-container">
                <form id="updateEventform" onsubmit="submitUpdate(); return false">
                    <h1>Edit events</h1>
                    <label for="events">Choose event:</label>
                    <select id="choose-event" name="eventId" onchange="populateForm();">
                        ${myEvent}
                    </select>
                    <input type="text" id="title-input" name="eventTitle" placeholder="Event name">
                    <input type="text" id="description-input" name="eventDescription" placeholder="Event description">
                    <label for="eventDate">Event Date:</label>
                        <input type="date" id="eventDateUp" name="eventDate">
                        <label for="eventTime">Event Time:</label>
                        <input type="time" id="eventTimeUp" name="eventTime">
                    <select id="choose-clubUp" name="clubId">
                        ${myClubs}
                    </select>

                    <input type="number" name="tickets" id="ticketsUp" placeholder="Enter amount of bookable tickets">
                    <button type="submit">Update event</button>
                    <button type="button" onclick="deleteEvent();">Delete Event</button>
                    <p id="confirmUpdate">The event has been updated!</p>
                    <p id="confirmDelete">The event has been deleted!</p>
                </form>
            </section>
        </section>
    `;
}

async function populateForm() {
    let selectedEventId = $('#choose-event').val();

    const selectedEvent = allEvents.find(
        (event) => event._id === selectedEventId
    );
    console.log(selectedEvent);
    if (selectedEvent) {
        $('#title-input').val(selectedEvent.title);
        $('#description-input').val(selectedEvent.description);
        let date = new Date(selectedEvent.date);
        console.log(date);
        let dateString =
            date.getFullYear().toString().padStart(4, '0') +
            '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            date.getDate().toString().padStart(2, '0');
        let timeString =
            date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0');
        $('#eventDateUp').val(dateString);
        $('#eventTimeUp').val(timeString);
        $('#choose-clubUp').val(selectedEvent.clubId);
        $('#ticketsUp').val(selectedEvent.available_tickets);
    }
}
//logout function
async function logOut() {
        await fetch('/api/login', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    window.location.href = '/#login';
    console.log('hopefully we will log out...');
}

async function submitUpdate() {
    let form = $('#updateEventform');

    let eventId = $('#choose-event').val();

    console.log(eventId);

    var eventTitle = form.find('[name="eventTitle"]').val();
    var eventDescription = form.find('[name="eventDescription"]').val();
    var clubId = form.find('[name="clubId"]').val();
    var tickets = form.find('[name="tickets"]').val();
    var eventDate = form.find('[name="eventDate"]').val();
    var eventTime = form.find('[name="eventTime"]').val();
    var date = new Date(eventDate + ' ' + eventTime);
    
    if ( !eventTitle || !eventDescription || !tickets || !eventDate || !eventTime) {
        console.error('Title or description is empty');
        return false;
    }

    let formData = {
        title: eventTitle,
        description: eventDescription,
        clubId: clubId,
        date: date,
        available_tickets: tickets,
    };

    try {
        //await populateForm();
        const response = await fetch('/api/events/' + eventId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit event');
        }

        $('#confirmUpdate').show();
        $('#confirmDelete').hide();
        console.log('Event successfully updated');
        return true;
    } catch (error) {
        console.error('Error updating event:', error);
    }
    console.log(formData);
}

async function deleteEvent() {
    let eventId = $('#choose-event').val();
    console.log('deleteEvent button was clicked.');

    try {
        const response = await fetch('/api/events/' + eventId, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete event');
        }

        $('#confirmDelete').show();
        $('#confirmUpdate').hide();
        console.log('Event successfully deleted');
        resetFormAdmin($('#updateEventform'));
        
        // Optionally, update the UI to reflect the deletion
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}

async function postEvent() {
    let form = $('#newEventForm');

    var title = form.find('[name="eventTitle"]').val();
    var description = form.find('[name="eventDescription"]').val();
    var clubId = form.find('[name="clubId"]').val();
    var tickets = form.find('[name="tickets"]').val();
    var eventDate = form.find('[name="eventDate"]').val();
    var eventTime = form.find('[name="eventTime"]').val();
    var date = new Date(eventDate + ' ' + eventTime);

    if (!title || !description || !eventDate || !eventTime || !tickets) {
        console.error('Title or description is empty');
        return;
    }

    let formData = {
        title: title,
        description: description,
        clubId: clubId,
        date: date,
        available_tickets: tickets,
    };

    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit event');
        }

        $('#confirmEvent').show();
        $('#confirmDelete').hide();
        console.log('Event submitted successfully');
        // call reset form
        resetFormAdmin(form);
    } catch (error) {
        console.error('Error submitting event:', error);
    }
    console.log(formData);
}

// function to clear out form
async function resetFormAdmin(formToClear) {
    let form = formToClear;
    form.find('[name="eventTitle"]').val('');
    form.find('[name="eventDescription"]').val('');
    form.find('[name="clubId"]').val('');
    form.find('[name="tickets"]').val('');
    form.find('[name="eventDate"]').val('');
    form.find('[name="eventTime"]').val('');
    console.log('cleared out form');
}

window.populateForm = populateForm;
window.submitUpdate = submitUpdate;
window.postEvent = postEvent;
window.deleteEvent = deleteEvent;
window.logOut = logOut;
