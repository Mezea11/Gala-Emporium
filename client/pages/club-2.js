export default async function club2() {
    const response = await fetch('/api/events/65ca1005dd4d79add97d34c6') //clubId: 65ca1005dd4d79add97d34c6
    const result = await response.json()

    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    let event = ''

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
            <p>${data.description}</p>
            <button>Tickets</button>
        </div>
      `    
    }
    return `
    <div id="club-2-container"> 
        <section id="title-club2">
            <h1>Valhall</h1>
            <h2>Live rock and metal at it's best</h2>
        </section>
        <div id="sidebar-club2">
            <p>One of Scandanavias biggest music clubs ever since it's inception in 1996. Bla bla</p>
    
        </div>
        <section id="event-container-club-2">
            ${event}
        </section>
    </div>
    `
}