function showNotification(message) {
    const notification_container = document.querySelector(".notification-container");
    const text = document.querySelector(".notification-text");
    
    // Update text
    text.textContent = message;

    // Animate
    notification_container.classList.remove("notification-container-animation");
    void notification_container.offsetWidth;
    notification_container.classList.add("notification-container-animation");
}

window.showNotification = showNotification;