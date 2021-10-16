self.addEventListener('install', event => {
    console.log('Se instala SW.. nuevo');

    //creación del cache
    const cacheAppShell = caches.open('mi-app-shellv1').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/js/app.js',
            '/img/bannerBolsaDeTrabajo.jpeg',
            '/img/UTH-LOGO-VERT.png',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/fonts/bootstrap-icons.woff?856008caa5eb66df68595e734e59580d'
        ]);
    });
    event.waitUntil(cacheAppShell);
});

self.addEventListener('activate', event => {
    console.log('El SW se ha activado.');

});


self.addEventListener('fetch', event => {
    console.log(event.request.url);
    //estrategia de gestion del cache - Cache Only
    // event.respondWith(
    //    caches.match(event.request)
    // );

    //estrategia del cache - Cache y despues Red
    event.respondWith(caches.match(event.request)
        .then(res => {
            //si la resp existe en el cache, regresar
            if (res) return res;
            else {
                console.log('No se encontró en el cache el ', event.request.url);
                //si la resp no existe
                //traerla de el sitio o el origen
                return fetch(event.request)
            }
        })
        .catch(error => {
            console.log('Error en fetch, ', error);
        })
    );

});