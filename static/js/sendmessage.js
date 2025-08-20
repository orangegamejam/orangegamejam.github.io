document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.contact-form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Grab values manually
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const organization = form.querySelector('input[name="organization"]').value;
    const interest = form.querySelector('select[name="interest"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    // Reset form
    form.reset();

    // Show notification
    showNotification("Message sent successfully!");

    // Send all fields to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbwliBhu-15LLEsxspfZoGPyVun7ypqxvu9bbLI3bC6ZmXUyiPYzDBTvqS9dIlfmizzXYw/exec', {
      method: 'POST',
      body: new URLSearchParams({
        name: name,
        email: email,
        organization: organization,
        interest: interest,
        message: message,
      })
    })
    .then(response => response.text())
    .then(data => console.log("Success:", data))
    .catch(err => console.error("Error:", err));
  });
});
