import { adminId, formData } from "./login.js";

export default async function admin() {
    
    console.log(adminId);
    
    const response = await fetch('/api/clubs/'+ adminId)
    const result = await response.json()

    console.log('hello world')
    //let clubArray = [];
    
    let clubArray = result.map(data => data._id);
    console.log(clubArray);
    
    // Fetch event data for all clubs concurrently
    const eventPromises = clubArray.map(clubId => fetch('/api/events/' + clubId));
    const eventResponses = await Promise.all(eventPromises);
    const eventResults = await Promise.all(eventResponses.map(response => response.json()));

    // eventResults is now an array of event data for each club
    console.log(eventResults);
    let myClubs = '';

    for (let i = 0; i < result.length; i++) {
        let data = result[i];

        myClubs += `
        <option value="${data._id}">${data.club_name}</option>
        `;   
    }
    
    let myEvent = '';

    for (let i = 0; i < eventResults.length; i++) {
        let eventsForClub = eventResults[i];

        for (let j = 0; j < eventsForClub; j++) {
            let data = eventsForClub[j];

            myEvent += `
            <option value="${data._id}">${data.title}</option>
            `;
        }

    }
    /*
    for (let i = 0; i < result.length; i++) {
        let data = result[i];
        clubArray.push(data._id);
       }

    console.log(clubArray);
    
    const response1 = await fetch('/api/events/'+ clubArray[0])
    const result1 = await response1.json()
    const response2= await fetch('/api/events/'+ clubArray[1])
    const result2 = await response2.json()
    
    console.log(result1);
    console.log(result2);
    */
    return `
        <section id="admin-container">
            <button onclick="logOut();">Log out</button>
            <section id="create-event-container">
                <h1>Create new event here:</h1>
                <form id="newEventForm" onsubmit="postEvent(); return false" >
                    <input type="text" name="eventTitle" placeholder="Enter event title">
                    <input type="text" name="eventDescription" placeholder="Describe the event">
                    <!--<input type="file" id="imageInput" name="image" accept="image/*">-->
                    <label for="eventDate">Event Date:</label>
                    <input type="date" id="eventDate" name="eventDate">
                    <label for="eventTime">Event Time:</label>
                    <input type="time" id="eventTime" name="eventTime">
                    <select id="choose-club" name="clubId">
                        ${myClubs}
                    </select>
                    <!-- date and time -->
                    <input type="number" name="tickets" placeholder="Enter amount of bookable tickets">
                    
                    <button type="submit">Create new event!</button>
                </form>
            </section> 
            
            <article class="event-container-admin">
                
            </article>
            
            <form id="#newPostform" onsubmit="submitForm(); return false">
                <input type="text" name="title" placeholder="Event name">
                <input type="text" name="description" placeholder="Event description">
                <!--<input type="file" id="imageInput" name="image" accept="image/*">-->
                <select id="choose-club" name="clubId">
                ${myClubs}
                </select>
            </form>
        </section>
    `
}

async function logOut() {
        const response = await fetch('/api/login', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

    window.location.href = '/#login';
    console.log("hopefully we will log out...")
};

async function postEvent() {
//   let imageInput = $( "imageInput" ); 
    let form = $( '#newEventForm' );

    var title = form.find('[name="eventTitle"]').val();
    var description = form.find('[name="eventDescription"]').val();
    var clubId = form.find('[name="clubId"]').val();
    var tickets = form.find('[name="tickets"]').val();
    var eventDate = form.find('[name="eventDate"]').val();
    var eventTime = form.find('[name="eventTime"]').val();
    var date = new Date(eventDate + ' ' + eventTime);

//   if (imageInput.files.length > 0) {
//    var image = form.find('[name="image"]').val();
//    formData.append('image', imageInput.files[0]);
//}
   //var clubId = form.find('[name="clubId"]').val();
   //var tickets = form.find('[name="tickets"]').val();

   if (!title || !description || !eventDate || !eventTime || !tickets) {
        console.error("Title or description is empty");
        return;
    }

   let formData = {
        title: title,
        description: description,
        clubId: clubId,
        date: date,
        available_tickets: tickets
    }

   try {
       const response = await fetch('/api/events', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });

       if (!response.ok) {
           throw new Error('Failed to submit event');
       }

       $('#confirmEvent').show();
       console.log('Event submitted successfully');
   } catch (error) {
       console.error('Error submitting event:', error);
   }
}

window.postEvent = postEvent;
window.logOut = logOut;