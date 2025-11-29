// Announcement bar
document.addEventListener('DOMContentLoaded', () => {
    const announcement = document.getElementById('announcement-bar');
    const closeBtn = document.getElementById('close-announcement');

    closeBtn.addEventListener('click', () => {
        announcement.classList.add('dismissed');

        // Remove element after animation completes
        announcement.addEventListener('transitionend', () => {
            announcement.style.display = 'none';
        }, { once: true });
    });
});

// Notification popup
function showNotification(message, type = "success", duration = 3000) {
    const container = document.querySelector(".notification-container");
    const success = container.querySelector(".notification.success");
    const failure = container.querySelector(".notification.failure");

    // Hide both first
    success.style.display = "none";
    failure.style.display = "none";

    // Pick the correct notification
    const notification = type === "success" ? success : failure;
    notification.querySelector(".notification-text").innerHTML = message;
    notification.style.display = "flex";

    // Animate
    container.classList.remove("notification-container-animation");
    void container.offsetWidth; // trigger reflow
    container.classList.add("notification-container-animation");

    // Auto-hide after duration
    setTimeout(() => {
        notification.style.display = "none";
    }, duration);
}

window.showNotification = showNotification;