document.addEventListener("DOMContentLoaded", () => {
    const days = document.querySelector("#days");
    const hours = document.querySelector("#hours");
    const minutes = document.querySelector("#minutes");
    const seconds = document.querySelector("#seconds");

    // Set countdown date
    const targetDate = new Date("2026-03-07T00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            // Countdown finished
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            clearInterval(interval);
            return;
        }

        const days_num = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours_num = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes_num = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds_num = Math.floor((diff % (1000 * 60)) / 1000);

        days.textContent = String(days_num).padStart(2, "0");
        hours.textContent = String(hours_num).padStart(2, "0");
        minutes.textContent = String(minutes_num).padStart(2, "0");
        seconds.textContent = String(seconds_num).padStart(2, "0");
    }

    // Update countdown every second
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
})