document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.register-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Show loading spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner"></span> Sending...`;

    // Grab values manually
    const team_name = form.querySelector('input[name="team_name"]').value;
    const division = form.querySelector('select[name="division"]').value;
    const team_size = form.querySelector('select[name="team_size"]').value;

    const participant1_name = form.querySelector('input[name="participant1_name"]').value;
    const participant1_email = form.querySelector('input[name="participant1_email"]').value;
    const participant1_phone = form.querySelector('input[name="participant1_phone"]').value;
    const participant1_age = form.querySelector('select[name="participant1_age"]').value;

    const participant2_name = form.querySelector('input[name="participant2_name"]').value;
    const participant2_email = form.querySelector('input[name="participant2_email"]').value;
    const participant2_phone = form.querySelector('input[name="participant2_phone"]').value;
    const participant2_age = form.querySelector('select[name="participant2_age"]').value;

    const participant3_name = form.querySelector('input[name="participant3_name"]').value;
    const participant3_email = form.querySelector('input[name="participant3_email"]').value;
    const participant3_phone = form.querySelector('input[name="participant3_phone"]').value;
    const participant3_age = form.querySelector('select[name="participant3_age"]').value;

    const refund_terms = form.querySelector('input[name="refund_terms"]').checked ? "Agreed" : "";
    const payment_terms = form.querySelector('input[name="payment_terms"]').checked ? "Agreed" : "";

    // Send all fields to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbyP18K3kTULsqFjiaN1Jf6b8nVeFugzixz5RmRvQQAtF1JAjSlRl1gC23B893dKZaiu_Q/exec', {
      method: 'POST',
      body: new URLSearchParams({
        team_name: team_name,
        division: division,
        team_size: team_size,

        participant1_name: participant1_name,
        participant1_email: participant1_email,
        participant1_phone: participant1_phone,
        participant1_age: participant1_age,

        participant2_name: participant2_name,
        participant2_email: participant2_email,
        participant2_phone: participant2_phone,
        participant2_age: participant2_age,

        participant3_name: participant3_name,
        participant3_email: participant3_email,
        participant3_phone: participant3_phone,
        participant3_age: participant3_age,

        refund_terms: refund_terms,
        payment_terms: payment_terms, 
      })
    })
    .then(response => response.json())
    .then(data => {
      showNotification("Registration submitted successfully! A confirmation email was sent to: <strong>" + participant1_email + "</strong>\nPlease make sure to check your spam folder.", 5000);
      form.reset();

      emailjs.init({
        publicKey: "kzcf0R9cqmnvu63XF",
      });

      // Send confirmation email
      var main_confirmation = {
        participant1_name: participant1_name,
        participant1_email: participant1_email,

        team_name: team_name,
        team_size: team_size,
        division: division,

        participant2_name: participant2_name,
        participant3_name: participant3_name
      };

      emailjs.send('service_63hu2md', 'template_ivzbnwf', main_confirmation);

      // Send email to participants
      var participant2_confirmation = {
        email: participant2_email,
        name: participant2_name,

        team_name: team_name,
        team_size: team_size,
        division: division,

        participant1_name: participant1_name,
        participant2_name: participant2_name,
        participant3_name: participant3_name
      }

      emailjs.send('service_63hu2md', 'template_vysy39u', participant2_confirmation);

      var participant3_confirmation = {
        email: participant3_email,
        name: participant3_name,

        team_name: team_name,
        team_size: team_size,
        division: division,

        participant1_name: participant1_name,
        participant2_name: participant2_name,
        participant3_name: participant3_name
      }

      emailjs.send('service_63hu2md', 'template_vysy39u', participant3_confirmation);

    })
    .catch(err => {
      console.error("Error:", err);
      showNotification("Failed to submit registration. Please try again.", "failure");
    })
    .finally(() => {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    });
  });
});