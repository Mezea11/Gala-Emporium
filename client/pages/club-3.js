export default async function club3() {
    // -- fetch events based on clubId
    // -- store in variable response
    // -- save the response in json format in variable result
    const response = await fetch('/api/events/65cb3564be0cac4cac4af614');
    const result = await response.json();

    // -- create variable which will be html element rendered in frontend containing fetched event data
    let club3Event = '';

    // loop through fetched result
    for (let i = 0; i < result.length; i++) {
        let data = result[i];

        console.log(data);
        // -- assign data to html elements
        club3Event += `
        <section class="event-club3">
                    <article>
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                    </article>
                    <div>
                        <img>
                        <a><button>Book here</button></a>
                    </div>
                </section>
        
        `;
    }

    return `
        <div id="club-3-container">
            
            <section id="about-club3">
                <h1>Malmö Up Club</h1>
                <p class: "club3-p">This is the CLUB3 page</p> 
            </section>
            
            <section id="calender-club3">
                <h2>Club Calender</h2>
                ${club3Event}
                
                <section class="event-club3">
                    <article>
                        <h3>Event  title</h3>
                        <p>Event info</p>
                    </article>
                    <div>
                        <img>
                        <a><button>Book here</button></a>
                    </div>
                </section>

                <section class="event-club3">
                    <article>
                        <h3>Event  title</h3>
                        <p>Event info</p>
                    </article>
                    <div>
                        <img>
                        <a><button>Book here</button></a>
                    </div>
                </section>

                <section class="event-club3">
                    <article>
                        <h3>Event  title</h3>
                        <p>Event info</p>
                    </article>
                    <div>
                        <img>
                        <a><button>Book here</button></a>
                    </div>
                </section>

            </section>
        </div>
    `;
}
