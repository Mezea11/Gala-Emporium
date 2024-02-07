export default function home() {
     return `
     <!-- MAIN CONTENT -->
     <main class="container">
       <aside class="sidebar">
         <p style="display: flex; align-items: center; justify-content: center; margin-top: 5rem;">Book your ticket today!</p>
       </aside>
       <section class="event-calendar">
           <!-- Add the collective event calendar here -->
           <h2>Upcoming Events</h2>
           <div class="event">
             <h3>Event Name</h3>
             <p>Description of the event.</p>
             <button>Book Tickets</button>
         </div>
           <!-- More events can be added similarly -->
       </section>
     </main>
     `
}