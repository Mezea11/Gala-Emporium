let allEvents = [];
let bookingEventId;
let availableTickets;
export default async function booking() {
    const response = await fetch('/api/events/');
    const result = await response.json();

    let fetchedEvents = '';
    let tickets_left = '';

    bookingEventId = sessionStorage.getItem("bookingEventId");
    availableTickets = sessionStorage.getItem("availableTickets");

    for (let i = 0; i < result.length; i++) {
      let data = result[i];
      allEvents.push(data);

      tickets_left += `
            ${data.available_tickets};
      ` 

      fetchedEvents += `
        <option value="${data._id}" ${data._id === bookingEventId ? "selected" : ""}>${data.title}</option>
         `;
    }

    
    return `
    <div id="booking-page-container">
      <section id="booking-page">
        <div id="inner-container">
          <h1>Book your tickets here!</h1>

          <form id="booking" onsubmit="submitForm(); return false">
            <input type="text" name="name" placeholder="enter your name">
            <input type="email" name="email" placeholder="enter your email">
      
            <div id="choose-event-div">
              <label for="events">Choose event:</label>
            </div>
            <select id="choose-event" name="eventId" onchange="populateTickets();">
            <option value="" disabled selected>Choose an event</option>
                ${fetchedEvents}
            </select>
 
            <h3>Available tickets: <span id="available-tickets">${availableTickets}</span></h3>
            <label for="service">Choose number of tickets:</label>
            <select id="tickets" name="tickets">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>    
            </select>
 
            <input type="submit" value="Submit your booking"></input>

            <p id="notEnoughTickets">There's not enough tickets left!</p>
            <p id="confirmBooking">Thank you! We have sent an email confirming your booking. Please save your reference number: <span id="confirmBookingId"></span> </p>
          </form>          
        </div>
      </section>
    
    `;
}

var ticketCount;
async function populateTickets() {
    
    let eventId = $('#choose-event').val();

    const selectedEvent = allEvents.find(event => event._id === eventId);

    ticketCount = selectedEvent.available_tickets;
    $('#available-tickets').text(ticketCount);
    
}

async function updateTicketCount() {
  let form = $('#booking');
  let eventId = form.find('[name="eventId"]').val();
  let userTickets = parseInt(form.find('[name="tickets"]').val(), 10);

  if (bookingEventId) {
      ticketCount = availableTickets;
  }

  // Check if the number of userTickets exceeds the available tickets or is negative
  if (userTickets > ticketCount || userTickets <= 0) {
      console.log('Invalid number of tickets');
      $("#notEnoughTickets").show();
      $("#confirmBooking").hide();
      return false;
  }

  let newTicketCount = ticketCount - userTickets;

  let ticketProperty = {
      available_tickets: newTicketCount
  };

  try {
      const response = await fetch('/api/events/'+ eventId, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ticketProperty),
      });

      if (!response.ok) {
          throw new Error('Failed to submit form');
      }

      return true;

  } catch (error) {
      console.error('Error submitting form:', error);
      return false;
  }
}


async function submitForm() {
    let form = $('#booking');

    var name = form.find('[name="name"]').val();
    var email = form.find('[name="email"]').val();
    var eventId = form.find('[name="eventId"]').val();
    var tickets = form.find('[name="tickets"]').val();

    if (!name || !email) {
        console.error('Name or email is empty');
        return;
    }

    let formData = {
        name: name,
        email: email,
        eventId: eventId,
        tickets: tickets,
    };

    try {
        let ticketCountValid = await updateTicketCount();
          if (ticketCountValid) {
          const response = await fetch("/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error("Failed to submit form");
          }

          let responseData = await response.json();
          let bookingId = responseData._id;
          
          $("#confirmBooking").show();
          $("#notEnoughTickets").hide();
          $("#confirmBookingId").text(` ${bookingId}`);
          console.log("Form submitted successfully");

//          await resetForm();

          sessionStorage.clear();
      } else {
        console.log("Ticket count validation failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
}

async function resetForm() {
  let form = $('#booking');
  form.find('[name="name"]').val('');
  form.find('[name="email"]').val('');
  form.find('[name="eventId"]').val('');
  form.find('[name="tickets"]').val('');
}

window.updateTicketCount = updateTicketCount;
window.populateTickets = populateTickets;
window.submitForm = submitForm;
