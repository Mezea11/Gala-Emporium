export default async function booking() {
   const response = await fetch('/api/events/')
   const result = await response.json()
   
   let newEvent = ''

   for (let i = 0; i < result.length; i++) {

      let data = result[i];
      
      newEvent += `
         <option value="${data._id}">${data.title}</option>
         `
      }

    return `
       <h1>Välkommen att boka dina biljetter här.</h1>

       <form id="booking" onsubmit="submitForm(); return false">
       <input type="text" name="name" placeholder="ange ditt namn">
       <input type="email" name="email" placeholder="ange din email">

       <label for="events">Välj evenemang:</label>
       <select id="choose-event" name="eventId">
          ${newEvent}
       </select>
 
       <label for="service">Välj antal biljetter:</label>
       <select id="tickets" name="tickets">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>    
       </select>
 
       <input type="submit" value="Skicka din bokning"></input>
 
    </form>

    <div id="confirmBooking">
      <p>Thank you! We have sent an email confirming your booking.</p>
    </div>
    `
}

async function submitForm() {

   let form = $( "#booking" );

   var name = form.find('[name="name"]').val();
   var email = form.find('[name="email"]').val();
   var eventId = form.find('[name="eventId"]').val();
   var tickets = form.find('[name="tickets"]').val();

   if (!name || !email) {
      console.error("Name or email is empty");
      return;
  }

   let formData = {
      name: name,
      email: email,
      eventId: eventId,
      tickets: tickets
    }

   try {
       const response = await fetch('/api/booking', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });

       if (!response.ok) {
           throw new Error('Failed to submit form');
       }

       $('#confirmBooking').show();
       console.log('Form submitted successfully');
   } catch (error) {
       console.error('Error submitting form:', error);
   }
}

window.submitForm = submitForm