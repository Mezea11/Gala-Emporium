export default async function club3() {
    // -- fetch events based on clubId
    // -- store in variable response
    // -- save the response in json format in variable result
    const response = await fetch('/api/events/65cb3564be0cac4cac4af614');
    const result = await response.json();

    // sort incoming data to order by date
    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    // -- create variable which will be html element rendered in frontend containing fetched event data
    let club3Event = '';

    // loop through fetched result..
    for (let i = 0; i < result.length; i++) {
        let data = result[i];

        console.log(data);

        // handle date data
        const eventDate = new Date(data.date).toLocaleString('en-SE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

        // -- assign data to html elements
        club3Event += `
        <section class="event-club3">
                    <article>
                        <h4>${eventDate}</h4>
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <h3>Tickets available: ${data.available_tickets}</h3>
                    </article>
                    <div>
                        <a href="#booking"><button onclick="navigateToBooking('${data._id}')">Book here</button></a>
                    </div>
                </section>
        
        `;
    }

    return `
        <div id="club-3-container">
            
            <section id="about-club3">
                <h1>Malmö Up Club</h1>
                <p>Welcome to Malmö's own central comedy club! 
                <br> <br>
                Here we offer a place and environment for everything in comedy. 
                Here you can enjoy a great selection of live performances from well known stand up 
                comics to amateurs trying out for the first time!
                <br> <br>
                See our calender below for upcoming events and to book your tickets!
                <br> <br>
                Have fun!
                </p> 
            </section>
            
            <section id="calender-club3">
                <h2>Club Calender</h2>
                <!-- render fetched events -->
                ${club3Event}
            </section>
        </div>
    `;
}

// go to bookings with chosen event already filled in
function navigateToBooking(eventId) {
    window.location.href = '#booking';
    sessionStorage.setItem('bookingEventId', eventId);
}

window.navigateToBooking = navigateToBooking;
