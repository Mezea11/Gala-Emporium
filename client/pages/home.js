export default function home() {
     return `
       <aside class="sidebar">
         <p style="display: flex; align-items: center; justify-content: center; margin-top: 5rem;">Book your ticket today!</p>
       </aside>
       <section class="event-calendar">
           <h2>Upcoming Events</h2>
           <div class="event">
             <h3>Event Name</h3>
             <p>Description of the event.</p>
             <button>Book Tickets</button>
         </div>
       </section>
     `
}