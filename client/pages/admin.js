import { adminId, formData } from "./login.js";

export default async function admin() {
    
    console.log(adminId);
    
    const response = await fetch('/api/clubs/'+ adminId)
    const result = await response.json()

    console.log('hello world')
    let myClubs = ''
    let clubArray = [];
    
    //let firstClub = result[0]
    //let secondCLub = result[1]

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
return `
    <section id="admin-container">
        <button onclick="logOut();">Log out</button>
        <article class="event-container-admin">
            ${myClubs}
        </article>
            
        <form id="booking" onsubmit="submitForm(); return false">
            <input type="text" name="title" placeholder="Event name">
            <input type="text" name="description" placeholder="Event description">
            
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
window.logOut = logOut;