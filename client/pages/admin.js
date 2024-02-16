import { adminId } from "./login.js";

export default async function admin() {
    
    console.log(adminId);
    
    const response = await fetch('/api/clubs/')
    const result = await response.json()

    console.log('hello world')
    let myEvent = ''

    for (let i = 0; i < result.length; i++) {

       let data = result[i];

       myEvent += `
       <h2>${data.club_name}</h2>
          `
       }


 return `
    <section id="admin-container">
        <article class="event-container-admin">
            ${myEvent}
        </article>
            
        <form id="booking" onsubmit="submitForm(); return false">
            <input type="text" name="title" placeholder="Event name">
            <input type="text" name="description" placeholder="Event description">
            
        </form>
    </section>
 `
}

async function postEvent() {

   let form = $( "#newEvent" );

   var title = form.find('[name="title"]').val();
   var description = form.find('[name="description"]').val();
   var clubId = form.find('[name="clubId"]').val();
   //var tickets = form.find('[name="tickets"]').val();

   if (!title || !description) {
      console.error("Title or description is empty");
      return;
  }

   let formData = {
      title: title,
      description: description,
      clubtId: clubId,
      //tickets: tickets
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