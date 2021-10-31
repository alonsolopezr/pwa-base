//def de la raiz
const rootString = '/';
const stage = 'prod'; //'dev' o 'prod'
if (stage === 'prod') {
    rootString = '/pwa-base/';
}
//definir los caches a utilizar
const CACHE_APP_SHELL = 'mi-app-shellv4';
const CACHE_DINAMICO = 'cache-dinamicov3';
const CACHE_INMUTABLE = 'cache-inmutablev2';

self.addEventListener('install', event => {
    console.log('Se instala SW.. nuevo');

    //creación del cache
    const cacheAppShell = caches.open(CACHE_APP_SHELL).then(cache => {
        return cache.addAll([
            rootString,
            rootString + 'index.html',
            rootString + 'css/style.css',
            rootString + 'js/app.js',
            rootString + 'img/bannerBolsaDeTrabajo.jpeg',
            rootString + 'img/UTH-LOGO-VERT.png',
            rootString + 'img/icons/favicon.ico',
            rootString + 'manifest.json'
        ]);
    });

    //guardamos elementos INMUTABLES
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/fonts/bootstrap-icons.woff?856008caa5eb66df68595e734e59580d'
        ]);
    });

    event.waitUntil(cacheAppShell);
});


//function poara borrar cache  recursivamente en promesas
function borrarCache() {
    caches.open(CACHE_DINAMICO).then(
        cache => {
            cache.keys().then(keys => {
                console.log("Numero de lementos en cache dinamico:" + keys.length);
                //limitar a 3 elementos
                if (keys.length > 3) {
                    cache.delete(keys[keys.length - 1]).then(
                        borrarCache()
                    );
                }
            });
        }
    )
}

self.addEventListener('activate', event => {
    console.log('El SW se ha activado.');

    event.waitUntil(borrarCache());

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
                fetch(event.request).then(nuevoElemento => {
                    caches.open(CACHE_DINAMICO).then(cache => {
                        cache.put(event.request, nuevoElemento);
                    });
                    return nuevoElemento.clone();
                }).
                catch(error => {
                    console.log("error en fetch de estrategia de cache ", event.request.url, error);
                });


            }
        })
        .catch(error => {
            console.log('Error en fetch, ', error);
        })
    );


});