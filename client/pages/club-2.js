export default async function club2() {
    const response = await fetch('/api/events/65ccb432127e1da39ec2381b') //clubId: 65ca1005dd4d79add97d34c6
    const result = await response.json()

    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    let event = ''

    let exempel = result[0]
    console.log(exempel)

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

        event += `
        <div class="event-club-2">
            <h1>${data.title}</h1>
            <h2>${eventDate}</h2>
            <p class="description-club2">${data.description}</p>
            <p class="date-club2">Tickets available: ${data.available_tickets}</p>
            <button onclick="navigateToBooking('${data._id}', '${data.available_tickets}')">Book tickets</button>
        </div>
      `
    }
    return `
    <div id="club-2-container"> 
        <section id="title-club2">
            <h1>Valhall</h1>
            <h2>Live rock and metal at it's best</h2>
        </section>
        <div id="sidebar-right-club2">
            <p>Experience a night out with amazing live music!</p>
            <a href="#booking"><button>Booking page</button></a>
        </div>
        <div id="sidebar-left-club2">
            <p>One of Scandanavias biggest music clubs, ever since it's inception in 1996. In central Gothenburg, the legendary club has hosted some of the biggest names in the rock and metal world. <br><br>Welcome to Valhall!</p>
        </div>
        <section id="event-container-club-2">
            ${event}
            <br><br><br>
        </section>
    </div>
    `
}

function navigateToBooking(eventId) {
    window.location.href = "#booking";
    sessionStorage.setItem('bookingEventId', eventId);
}

window.navigateToBooking = navigateToBooking;