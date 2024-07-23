// notificationSystem.js

(function() {
    'use strict';

    let activeNotifications = [];
    const NOTIFICATION_SPACING = 10; // pixels between notifications

    function displayNotification({
        message,
        duration = 5000,
        backgroundColor = 'rgba(255, 0, 0, 1)',
        textColor = 'white',
        fadeInDuration = 200,
        fadeOutDuration = 250,
        moveDuration = 100
    }) {
        const notificationDiv = document.createElement('div');
        notificationDiv.style.position = 'fixed';
        notificationDiv.style.right = '10px';
        notificationDiv.style.backgroundColor = backgroundColor;
        notificationDiv.style.color = textColor;
        notificationDiv.style.padding = '10px';
        notificationDiv.style.borderRadius = '5px';
        notificationDiv.style.zIndex = '10000';
        notificationDiv.style.transition = `opacity ${fadeInDuration}ms, transform ${moveDuration}ms, bottom 100ms ease-in-out`; // Added ease-in-out for bottom
        notificationDiv.style.opacity = '0';
        notificationDiv.textContent = message;

        // Add an 'x' button to close the notification
        const closeButton = document.createElement('span');
        closeButton.textContent = 'x';
        closeButton.style.marginLeft = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            fadeOutAndRemove(notificationDiv);
        });
        notificationDiv.appendChild(closeButton);

        document.body.appendChild(notificationDiv);

        // Set initial position
        updateNotificationPositions();

        // Fade in
        setTimeout(() => {
            notificationDiv.style.opacity = '1';
        }, 0);

        activeNotifications.push(notificationDiv);

        // Set timeout to remove notification
        setTimeout(() => {
            fadeOutAndRemove(notificationDiv);
        }, duration - fadeOutDuration);
    }

    function updateNotificationPositions() {
        let currentBottom = 10;
        activeNotifications.forEach((notification) => {
            notification.style.bottom = `${currentBottom}px`;
            currentBottom += notification.offsetHeight + NOTIFICATION_SPACING;
        });
    }

    function fadeOutAndRemove(element) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.remove();
            activeNotifications = activeNotifications.filter(n => n !== element);
            updateNotificationPositions();
        }, 250);
    }

    // Expose the displayNotification function globally
    window.displayNotification = displayNotification;
})();
