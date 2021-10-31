//validar si podemos tener sw
if (navigator.serviceWorker) {
    console.log("Si esta disponible el trabajo con el Service worker");
    //instalar el service worker
    navigator.serviceWorker.register('pwa-base/sw.js');
    console.log(navigator.serviceWorker);
} else
    console.log("NO esta disponible el trabajo con el Service worker en este browser");