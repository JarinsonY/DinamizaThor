;
//Asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_afrobin',
    urlsToCache = [
        './',
        'https://fonts.googleapis.com/css?family=Playfair+Display:700,900',
        'https://fonts.googleapis.com/css2?family=Montserrat&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
        './style.css',
        './script.js',
        './landing/img/Logo.png',
        './landing/img/favicon.png'
    ]


    /* Evento: Instalación */
//Durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    )
})

    /* Evento: Activavción */
//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        //Eliminamos lo que ya no se necesita en cache
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            // Le indica al SW activar el cache actual
            .then(() => self.clients.claim())
    )
})

    /* Evento: Fetch(Recuperar recursos del navegador cuando se tenga conexión a internet y detecta cambios) */
//Cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //Recuperar del cache (deja el caché que está)
                    return res
                }
                //Recuperar de la petición a la url (Tuvo que consultar URL real)
                return fetch(e.request)
            })
    )
})