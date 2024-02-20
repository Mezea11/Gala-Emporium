export default async function club4() {
    const response = await fetch('/api/events/65ca1005dd4d79add97d34c6')
    const result = await response.json()
    //sortera objekten i hämtad array efter date property
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    //deklarera tom variabel för de objekt vi vill rendera på sidan
    let myEvents = ''
    //går igenom hämtad data (array) och väljer vilka properties vi vill ha ur datan samt hur dessa ska visas i vår html
    for (let i = 0; i < result.length; i++) {

        let data = result[i];
        let date = new Date (data.date);
        // parse object date property som datum och klockslag separat
        let dateString = date.getFullYear().toString().padStart(4, '0') + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
        let timeString = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
        //för varje [i] i result skapar vi en instans av myEvents med data från objektet tillhörande [i]
        myEvents += `
        <article class="event-club-4">
            <div class ="event-club-4-dateTime">
                <span>Date: ${ dateString }</span>
                <span> Time: ${ timeString }</span>
            </div>
            <h1>${ data.title }</h1>
            <p onclick="expandDescription(this)">${ data.description }</p>
            <div class ="event-club-4-lastRow">
                <button class="booking-button" onclick="navigateToBooking('${data._id}')">Tickets</button>
                <p>Tickets left: ${data.available_tickets}</p>
            </div>
        </article>
      `

    }

    return `
        <div id="club-4-container">
            <div id="video-container">
                <video autoplay muted loop id="video-background">
                    <source src="./assets/club-4.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <section id="club-4-about">    
                <h1>Blind Melon</h1>
                <p>Blind Melon is the club celebrating the eclectic side of 90's rock music. A crossover in time when labels, 
                even the smaller one, still had considerable resources while the media landscape was changing in a way that music 
                could reach an audience, even if you weren't a top 3 artist on a top 3 label. What ensued was moment of movement, 
                a excess of express, an emulsion of emotions and an emotional eon of awesome condensed to a diamond in our timeline.</p>
            </section>

            <section id="event-container-club-4">
                ${myEvents}
            </section>
        </div>
        `
    }

    function expandDescription(paragraph) {
        if (paragraph.classList.contains('expanded')) {
            paragraph.classList.remove('expanded');
        } else {
            paragraph.classList.add('expanded');
        }
    }
    //navigerar till booking-sidan och skickar med eventId för att få det evenemang du klickade på som förval
    function navigateToBooking(eventId) {
        window.location.href = "#booking";
        sessionStorage.setItem('bookingEventId', eventId);
    }

    window.expandDescription = expandDescription;
    window.navigateToBooking = navigateToBooking;