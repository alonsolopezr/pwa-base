//registering the SW JS file
if ('serviceWorker' in navigator) {
    console.log('Service Worker available');
    navigator.serviceWorker.register('/sw.js')
        .then(function(registration) { console.log('SW registration succeded. ', registration); })
        .catch(function(error) { console.log('SW registration failed, ', error); });
} else
    console.log('Service Worker NOT supported');