document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.subscribe-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="text"]');
        const email = emailInput.value.trim();

        if (!email) {
            showNotification("Please enter a valid email.", "failure");
            return;
        }

        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxCnoeVBUCZHbDFWgCecVdoTYC7LuQfW5P7NAw5xtBeVkx_9Wp33OSocxYUo8ojaoUt/exec', {
                method: 'POST',
                body: new URLSearchParams({ email: email })
            });

            if (!response.ok) throw new Error("Network response was not ok");

            form.reset();
            showNotification("Successfully subscribed to mailing list!", "success");

        } catch (err) {
            console.error(err);
            showNotification("Subscription failed. Please try again.", "failure");
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});
