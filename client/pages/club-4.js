export default async function club4() {
    const response = await fetch('/api/events/65ca1005dd4d79add97d34c6') //clubId: 65ca1005dd4d79add97d34c6
    const result = await response.json()

    let anything = ''

    for (let i = 0; i < result.length; i++) {

        let data = result[i];
        
        anything += `
        <div class="event-club-4">
            <span> 2024-04-15 20:00 </span>
            <h1>${data.title}</h1>
            <p>${data.description}</p>
            <button>Tickets</button>
        </div>
      `
//      console.log(result);
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
            ${anything}
        </section>
        `
    }

/*    return `
    <div id="club-4-container">
        <div id="video-container">
                <video autoplay muted loop id="video-background">
                    <source src="./assets/club-4.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        <section id="club-4-about">    
            <h1>Blind Melon</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>

        <section id="event-container-club-4">
            <div class="event-club-4">
                <span> 2024-04-15 20:00 </span>
                <h2> ${data.title} </h2>
                <p> ${data.description} </p>
                <button>Tickets</button>
            </div>
            <div class="event-club-4">
                <span> 2024-04-15 20:00 </span>
                <h2> Event Title </h2>
                <p>Event description</p>
                <button>Tickets</button>
            </div>
            
            <div class="event-club-4">
                <span> 2024-04-15 20:00 </span>
                <h2> Event Title </h2>
                <p>Event description</p>
                <button>Tickets</button>
            </div>
            
            <div class="event-club-4">
                <span> 2024-04-15 20:00 </span>
                <h2> Event Title </h2>
                <p>Event description</p>
                <button>Tickets</button>
            </div>
        </section>
    </div>
    `
}*/