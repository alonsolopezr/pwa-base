//validar si podemos tener sw
if (navigator.serviceWorker) {
    console.log("Si esta disponible el trabajo con el Service worker");
    //instyalar el service worker
    navigator.serviceWorker.register('../sw.js');
} else
    console.log("NO esta disponible el trabajo con el Service worker en este browser");