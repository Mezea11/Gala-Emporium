export default function club1() {
    return `
    <section id="club-1-section">
        <div id="club-1-sidebar"></div>
    </section>
    <div class="ivy-container">
        <div class="ivy-main-container">
          <div class="ivy-section-container">
            <section id="ivy-section">
            <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Step into Ivy Lounge, where live music thrives in an atmosphere of mystery and elegance. Nestled in Lund, our speakeasy-style club hosts an eclectic lineup of talented artists, bringing soulful jazz, blues, and more to our intimate stage.
                  </p>
                  <button>Book Tickets</button>
                </div>
            </section>
            <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
            <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
            <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
                <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
                <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
            <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
            <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
            <section id="ivy-section">
                <h2>Upcoming Events</h2>
                <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
            <section id="ivy-section">
                <h2>Upcoming Events</h2>
                  <div class="ivy-events">
                  <h3>Event Name</h3>
                  <p>Description of the event.</p>
                  <button>Book Tickets</button>
                </div>
            </section>
        </div>
        <div class="aside-container">
            <aside id="ivy-aside-1">
              <h2>Welcome to the Ivy Lounge</h2>
              <h4>Where the Night Comes Alive</h4>
              
              <p>Step into Ivy Lounge, where live music thrives in an atmosphere of mystery and elegance. Nestled in Lund, our speakeasy-style club hosts an eclectic lineup of talented artists, bringing soulful jazz, blues, and more to our intimate stage.

              Sip handcrafted cocktails as you immerse yourself in the vibrant energy of live performances. Join our community of music enthusiasts and indulge in unforgettable nights at Ivy Lounge, where every note is an invitation to savor the moment.</p>
              <img src="assets/club-image.jpg" alt="" />
            </aside>
        </div>
        </div>
    </div> 
    `;
}




/* 

// Function to fetch data from API and populate HTML
function fetchDataAndPopulateHTML() {
  // Fetch data from the API
  $.get('./server/api/clubs', function(data) {
      // Loop through each event
      data.forEach(function(event) {
          // Create HTML structure for each event
          var eventHtml = `
              <section id="ivy-section">
                  <h2>Upcoming Event: ${event.title}</h2>
                  <div class="ivy-events">
                      <button>Book Tickets</button>
                  </div>
              </section>
          `;
          // Append the HTML to the container
          $('.ivy-section-container').append(eventHtml);
      });
  });
}

// Call the functions to build HTML and fetch data
$(document).ready(function() {
  // Build HTML structure
  $('body').append(buildHTML());
  
  // Fetch data and populate HTML
  fetchDataAndPopulateHTML();
});

*/