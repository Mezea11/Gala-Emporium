
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
              <h4>${eventDate}</h4>
              <p>${data.description}</p>
              <a href="#booking"><button>Book Tickets</button></a>
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
       <p>Step into Ivy Lounge, where live music thrives in an atmosphere of mystery and elegance. Nestled in Lund, 
       our speakeasy-style club hosts an eclectic lineup of talented artists, bringing soulful jazz, blues, and more
        to our intimate stage.</p>

       <a href="#club-2"
       <h3 class = club-name >Valhall</h3>
       </a>
       <p>One of Scandanavias biggest music clubs ever since it's inception in 1996...
       </p>

       <a href="#club-3"
       <h3 class = club-name >Malmö Up</h3>
       </a>
       <p>This is the description of Malmö up Clup, with Stand-up comedy from the worlds 4 corners...
       </p>
       
       <a  href="#club-4"
       <h3 class = club-name >Blind Melon</h3>
       </a>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
       </p>
       </div>
     </aside>
     `
}