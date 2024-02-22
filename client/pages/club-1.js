export default async function club1() {
  const response = await fetch('/api/events/65c4e75412df1cd5059cdd46') //Specific clubId for Ivy Lounge: 65c4e75412df1cd5059cdd46
  const result = await response.json()

  // Sorts events by date
  result.sort((a, b) => new Date(a.date) - new Date(b.date));

  let club1Events = ''

  // Loop through array to get event objects
  for (let i = 0; i < result.length; i++) {
      
      let data = result[i];
      
      const eventDate = new Date(data.date).toLocaleString('en-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
    
  // -- assign fetched data to html elements with jquery
      club1Events += `
      <div class="event-club-1">
          <h2>${data.title}</h2>
          <p>${data.description}</p>
          <h5>${eventDate}</h5>
          <p id="date-club1">Tickets available: ${data.available_tickets}</p>
          <button class="booking-button" onclick="navigateToBooking('${data._id}', '${data.available_tickets}')">Book Tickets</button>
          
      </div>
    `    

  }

    return `
    <div id="club-1-container">
      <section id="club-1-about">    
          <h1>Ivy Lounge</h1>  
          <h2>Ivy Lounge: Where Live Events Thrive</h2>
          <p>Ivy Lounge: Where the whispers of jazz mingle with the clink of glasses. Step into our clandestine world, where every night is a journey into the heart of live music. Lose yourself in the intimate ambiance, where soulful melodies and crafted cocktails collide to create unforgettable moments. Welcome to Ivy Lounge, where the night comes alive.
          </p>
      </section>

      <section id="event-container-club-1">
          ${club1Events}
      </section>      
      <section id="club-1-sidebar">
        <h2>Book your tickets today.</h2>
        <a href="#booking" class="club-1-booking"><button>Get Started</button></a>
        <p>Ivy Lounge</p>
      </section>
      `
  }


    // Navigates to specific booking ID when "Book Tickets" button is pressed 
    function navigateToBooking(eventId, availableTickets) {
      window.location.href = "#booking";
      sessionStorage.setItem('bookingEventId', eventId);
      sessionStorage.setItem('availableTickets', availableTickets);
  }

  window.navigateToBooking = navigateToBooking;