document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector('.subscribe-form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.querySelector('input[type="text"]').value;
        form.reset();
        
        showNotification("Successfully subscribed to mailing list!");
        
        fetch('https://script.google.com/macros/s/AKfycbxCnoeVBUCZHbDFWgCecVdoTYC7LuQfW5P7NAw5xtBeVkx_9Wp33OSocxYUo8ojaoUt/exec', {
            method: 'POST',
            body: new URLSearchParams({ email: email, })
        })
        .then(response => response.text())
        .catch(err => console.error(err));
    });
})