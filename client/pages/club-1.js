export default function club1() {
    return `
    <section id="club-1-section">
        <div id="club-1-sidebar"></div>
    </section>
     <div id="club-1-container">
       <h1>Welcome to the Whispering Ivy Lounge.</h1>
       <p id="club-1-p">Indulge in the warm embrace of our cozy ambiance, where whispers weave through the air like tendrils of ivy. 
       Savor each moment as you're enveloped in the timeless charm of our speakeasy hideaway. 
       Whether you're here to unwind with a cocktail or lose yourself in captivating conversation, let the Whispering Ivy Lounge be your refuge from the bustling world outside.</p>
       <button onclick='location.href="index.html"' id="club-1-home-btn">Back to main page</button
     </div>
     
      <div class="club-1-event-calendar">
      <h2>Upcoming Events</h2>
      <div class="event">
        <h3>Event Name</h3>
        <p>Description of the event.</p>
        <button>Book Tickets</button>
      </div>
    `;
}

document.body.classList.add('club-1-body');

