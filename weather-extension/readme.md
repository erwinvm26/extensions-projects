# Google Chrome Extension
### Dependencia de la API de Google Chrome
```
@types/chrome
```

### vite.config
1. `vite.config.ts` Compila la extensión del navegador
2. `vite.content.config.ts` Compila el content script

### manifest.ts
Creamos aquí nuestra estructura que debe de tener nuestro manifest y lo tipamos de esta manera:

```
chrome.runtime.ManifestV3
```

### Como implementamos la API de Google Chrome
No importa si nuestro archivo es (.ts, .tsx, .js, .jsx). Podremos llamar aun así
a nuestras propiedades de la API de Google Chrome de
esta manera:

```
chrome.(prototype)
```

En mi caso he creado un archivo de la API de Google Chrome Extension

```
src/utils/apiChrome.ts
```

Aquí encontrarás ciertas acciones que la API nos permite hacer y cabe recalcar que está limitado a este proyecto, por lo que no encontraras todo lo que la API nos ofrece, más solo lo básico.

Por ejemplo:

```
1. storage
2. badge
3. notification
4. tabs.query
```

### Que encontraremos
En este proyecto encontraremos una `Weather App` en el cual agregamos nuestro país y se estará incorporando el clima de este, para ello se utilizó una API que nos permite consultar el clima.

```
https://api.weatherapi.com/v1/current.json
```

Usando los `Badge` de Chrome Extension para mostrar los `Grados Celcios`, así como las `Notifications` cuando se agrega una nueva ciudad.

Para darle un poquito más de complejidad al proyecto, se agregó `Content Script` un componente que se incorpora en los sitios webs y nos permite ver la información del clima del primero de la lista de nuestra extensión. A subes, utilizamos `Message Script` teniendo una comunicación de nuestra extensión con el componente.

### Corramos nuestra extensión
Primero abrimos una terminar y ejecutamos el siguiente comando, para que nuestra app genere los archivos necesarios para nuestra extensión
```
yarn dev
```

Se estará creando una carpeta nombrada: `dist`. Luego, abrimos una terminal en paralelo a la otra, y ejecutamos el siguiente comando, con el fin de compilar nuestro `content script`
```
yarn build:content
```