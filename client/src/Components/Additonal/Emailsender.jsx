function Emailsender({ email, message,subject }) {

    const messageBody = { email: email, message: message ,subject:subject};
    console.log(messageBody);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/mailsend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageBody),
      })
        .then(response => response.json())
        .then(data => {
            return data.EmailSent; 
        })
        .catch(error => {
          console.error('Error sending email:', error);
        });
 
    
}

export default Emailsender
