
export default async function home() {
  const response = await fetch('/api/events/');
  const result = await response.json();

  result.sort((a, b) => new Date(a.date) - new Date(b.date));

  let html = '';

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


    html += `
          <div class="event">
              <h3>${data.title}</h3>
              <h3>${eventDate}</h3>
              <p>${data.description}</p>
              <h3>Tickets available: ${data.available_tickets}</h3>
              <a onclick="navigateToBooking('${data._id}', '${data.available_tickets}')"><button>Book tickets</button></a>
          </div>
      `;
  }
  return `
  <div id= home-container>
       <section class="event-calendar">
           <h2>Upcoming Events</h2>

      ${html}

       </section>
       
       <aside class="sidebar">
       <a href="#club-1"
       <h3 class = club-name >Ivy Lounge</h3>
       </a>
       <p>Step into Ivy Lounge, where live music thrives in an atmosphere of mystery and elegance.
       </p>

       <a href="#club-2"
       <h3 class = club-name >Valhall</h3>
       </a>
       <p>One of Scandanavias biggest music clubs, ever since it's inception in 1996.
       </p>

       <a href="#club-3"
       <h3 class = club-name >Malmö Up</h3>
       </a>
       <p>Here we offer a place and environment for everything in comedy.
       </p>
       
       <a  href="#club-4"
       <h3 class = club-name >Blind Melon</h3>
       </a>
       <p>Blind Melon is the club celebrating the eclectic side of 90's rock music.
       </div>
     </aside>
     `
}

function navigateToBooking(eventId, availableTickets) {
  window.location.href = "#booking";
  sessionStorage.setItem('bookingEventId', eventId);
  sessionStorage.setItem('availableTickets', availableTickets);
}

window.navigateToBooking = navigateToBooking;