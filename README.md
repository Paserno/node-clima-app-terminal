> __Elemento Anterior 👀:__ __[Aplicación de Consola Interactiva 🖥️](https://github.com/Paserno/node-consola-todo-app)__

# Aplicación de Clima ⛅ 
Esta es una aplicación de clima con ayuda de la API de OpenWeatherMaps.
Elementos Utilizados:
* [Colors.js](https://www.npmjs.com/package/colors)
* [Inquirer.js](https://www.npmjs.com/package/inquirer)
* [Axios](https://www.npmjs.com/package/axios)
* [Mapbox](https://www.mapbox.com)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [OpenWeather](https://openweathermap.org)

Se utilizaron 4 paquetes (Colors, Inquirer, Axios y Dotenv) y 2 APIs (Mapbox: mapa, OpenWeather: clima).
#
#### Para reconstruir los modulos de node ejecute el siguiente comando.
````
npm install
````
#
### 1.- Inicio del Proyecto: 🏁
Como primer paso se compio el archivo __[inquirer.js](https://github.com/Paserno/node-consola-todo-app/blob/main/helpers/inquirer.js)__ del repositorio anterior, ya que tiene varios elementos ya construidos para una __Consola Interactiva__.
* Se crea una carpeta `helpers/` y se inserta el File __inquirer.js__
* El __inquirer.js__ se adaptará para las necesidades del presente repositorio.
* Se modifican las opciones del objeto literario de `menuOpts` los nombres del `choices`.
````
{
    value: 1,
    name: `${'1.'.brightMagenta} Buscar Ciudad`
},
{
    value: 2,
    name: `${'2.'.brightMagenta} Historial`
},
{
    value: 0,
    name: `${'0.'.brightMagenta} Salir`
}
````
* Luego se crea el __main__ en __index.js__, creandolo con el `async`.
* Luego se crea el __do-while__, para tener el menu interactivo, dejando la __opción 0__ para salir de la condición.
* No olvidar imporar los elementos de __inquirer.js__, en este caso el __Menú__ `inquirerMenu()`
````
let opt;
do {
    opt = await inquirerMenu();

    switch (opt) {
        case 1:
            console.log('Buscar Ciudad');
        break;
        case 2:
            console.log('Historial')
        break;
        case 0:
            console.log('Salir')
        break;
        }
        await pausa();
} while (opt !== 0);
````
#
### 2.- Modelo para controlar la aplicación: 
* Crear carpeta `models/` y File `busquedas.js`, para luego crear la clase `Busquedas` con su __constructor__.
* Luego creamos los elementos que se mostraran por pantalla en el __switch__ del __main (index.js)__.
````
case 1:
    const lugar = await leerInput('Ciudad: ');
    console.log(lugar);

    console.log('\nInformacion de la Ciudad\n'.brightMagenta);

    console.log('Ciudad:');
    console.log('Lat:');
    console.log('Lng:');
    console.log('Temperatura:');
    console.log('Minima:');
    console.log('Maxima:'); 
brack;
````
#
### 3.- Realizar Peticiones HTTP desde Node 🟩:
Se vio la alternativas que existian para __Node__ para hacer peticiones HTTP, se vieron diferentes paquetes de terceros, uno de estos eran:

* [Request](https://www.npmjs.com/package/request)
* [Fetch](https://www.npmjs.com/package/fetch)
* __[Axios](https://www.npmjs.com/package/axios) <---__

La Primera opción __Request__ es muy utilizada por la comunidad mas de 20M de descargas, pero dice el autor que se esta quedando obsoleta. <br>
Despues esta __Fetch__ con 50k de descargas aprox (fecha actual del post), si bien el fetch de los navegadores son muy utiles, en node no es soportado, por eso hay que acudir a un 3ro, pero este paquete presenta algunas falencias, le falta ciertos elementos que no lo hacen estar completo. <br>
Despues esta __Axios__ que es un paquete descargado por mas de 20M, es algo similar que __Request__, pero con la diferencia que trabaja con __Promesas__ y es el que se escogio para este proyecto.

* Se instalo __axios__, para luego importarlo en `busquedas.js`.
* Para probar se llamo a una API, esta es __reqres.in__, para hacer la petición inicial para el uso de `axios`.
* En el metodo `ciudad()` se realizo la petición __get__ a la __API__.
* Se establecio el `console.log` para mostrar por pantalla los los __datos__ que son traidos por `resp` de la API.
* Se encerro en un __try-catch__ en caso de tener algun tipo de error poder capturarlo.
````
async ciudad( lugar = '' ){
    try {
        // Peticion HTTP
        const resp = await axios.get('https://reqres.in/api/users?page=2');
        console.log(resp.data);

        return [];

    } catch (error) {
        return [];
    }
}
````
Ahora en __index.js__ de la aplicación.
* En el __Switch__ `case 1:` se inserto el metodo de __Busquedas__ `ciudad()`.
* Para realizar las pruebas, se puso el `console.log` en el metodo `ciudad()`.
````
const lugar = await leerInput('Ciudad: ');
await busquedas.ciudad( lugar );
```` 
#
### 4.- Pulir intancia de Axios:
Ahora utilizaremos la API de Mapbox, para poder traer los datos que se desean obtener.
* Eliminamos el `axios.get` del anterior paso, para remplazarlo por lo que construiremos ahora.
* Se crea una constante llamada `intance`, con ayuda de `axios.create`.
* Establecemos __baseURL__, nos basamos en la documentacion de Axios, y ingresamos la dirección de la API, para luego establecerle el argumento que recibiremos llamado `lugar` en el medodo __Ciudad__, esta sera recibida para hacer la busqueda.
* Le pasamos los parametros de busqueda, que mostraremos a posteriormente en `params: ...`.
````
const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
});
````
* Creamos un `get paramsMapbox()`, para tener un mayor orden en el codigo.
* Lo que le retornaremos son los parametros que necesita __Axios__ para la busqueda de la ciudad, en este caso necesitando  el __token__, __limite__ de resultados a entregar y el __idioma__, en este caso español. 
````
get paramsMapbox(){
    return {
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5,
        'language': 'es'
    }
}
````
* No olvidar, que se tiene un file llamado __.env__ _(gracias a Dotenv)_ donde se almacenan las variables de entorno y donde esta el acceso al token `access_token`.
* Con esta "Key" se puede acceder a la API.
````
MAPBOX_KEY=xxxxxxxxx
````
* Ademas se importo en __index.js__.
````
require('dotenv').config()
````
#
### 5.- Listar Lugares Interactivamente:
* Modificaremos la función `listadoTareasBorrar()` y le la cambiaremos a `listarLugares` (en  __inquirer.js__).
* Utilizado nombre de propiedades de acuerdo a la aplicación.
````
const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map( (lugar, i) => {
        const idx = `${i + 1}`.brightGreen;
        return {
            value: lugar.id,
            name: `${idx}. ${lugar.nombre}`
        }
    });
````
Nos vamos a `busqyedas.js` en el metodo `ciudad` dentro del __try__ en el `try-catch`;
* Luego retornaremos los valores que necesitamos en este caso `resp.data.features` que viene de la API _("features" que es el contenido que necesitamos de la busqueda)_.
* Se realiza un `.map()` para entregar otro arreglo personalizado, arrojando la id, nombre, longitud y latitud.
````
return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
````
> Ordenando el Switch. 
<br>

Ahora ordenaremos el codigo, en el `case 1:` del `switch` en el __index.js__.
* En mostrar mensaje se cambio la constante acorde a la solucion de `const lugar` paso a `const termino`
````
const termino = await leerInput('Ciudad: ');
````
* En Buscar los lugares se declaro una constante nuevoa llamada `lugares`
````
const lugares = await busquedas.ciudad( termino );
````
* Se invoca la funcion `listarLugares()` donde se le pasa `lugares`.
* En la seleccion del lugar se realizo un filtro con `.find()`, para pasar 1 elemento, el que fue seleccionado.
````
// Seleccionar el lugar
const id = await listarLugares(lugares);
const lugarSel = lugares.find( l => l.id === id );
console.log(lugarSel);
````
Faltaria integrar la otra __API__ del __Clima__, para luego mostrar los resultados completos.
* Por el momento se tiene el nombre de la ciudad, latitud y longitud.
````
console.log('\nInformacion de la Ciudad\n'.brightMagenta);
console.log('Ciudad:', lugarSel.nombre);
console.log('Lat:', lugarSel.lat );
console.log('Lng:', lugarSel.lng);
```` 
#
### 6.- Información del Tiempo:
A si como nos conectamos a la primera API Mapbox, de la misma manera nos conectaremos a la __API OpenWeather__.
* Una vez validado los datos en __Postman__ generamos una función get, para solicitar la información con algunos parametros, ademas del token.
* Nos vamos a __busquedas.js__
````
get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
}
````
* Creamos la funcion asincrona `climaLugar`, la que necesitamos la latitud y longitud, que nos pasará la otra API _(Mapbox)_.
* Establecemos el Axios, con los datos a utilizar, la URL ademas de sus paramentros a utilizar _(usando el get anterior mencionado)_.
````
async climaLugar(lat, lon){
     try {
        const intance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsOpenWeather, lat, lon}
        });
        ...
        }
         catch (error) {
         console.log(error);
     }   
}
````
*  Nos traemos el `intance` que nos guarda los datos que nos entrega el axios, para luego guardarlo en una constante.
* Hacemos la desestructuracción de `resp.data`, para traernos los datos de la API que necesitamos, en este caso `{ weather, main }`.
````
const resp = await intance.get();
const { weather, main } = resp.data;
````
* Realizamos el retorno, de los datos que utilizaremos, para mostrar por pantalla.
```` 
return {
    desc: weather[0].description.toUpperCase(),
    min: main.temp_min,
    max: main.temp_max,
    temp: main.temp
};
````
Ahora estamos en file __index.js__.
* Treamos el nuevo metodo `climaLugar()` y le entregamos la latitud y lognitud, anteriormente obtenidas.
````
const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
````
* Ahora usamos la constante `clima` que declaramos, para traer los diferentes elementos del return del metodo `climaLugar()` y los mostramos por pantalla _(consola)_.
```` 
console.log('Temperatura:', clima.temp);
console.log('Maxima:', clima.max);
console.log('Minima:', clima.min);
console.log('Como esta el clima:', clima.desc.brightGreen);
````
#
### 7.- Registrar Busqueda en .JSON:
Deseamos tener un registro persistente de la busqueda, para esto se desea guardar en un archivo, para no solo tenerlo en memoria lo que registramos.
* Como primer paso creamos la 📂carpeta `db/`, para dejar el registro de las busquedas.
* Luego nos vamos al file __busquedas.js__, para vaciar nuestro arreglo de la clase `historial`.
* Creamos el path de nuestra "base de dato".
````
historial = [];
dbPath = './db/database.json'
````
* Creamos el metodo `guardarDB`, lo que hara es registrar en un archivo `.JSON` los datos.
* Creamos un `payload`, para guardar los registros del arreglo.
* Luego se lo pasamos a la propiedad `fs.writeFileSync()`, no olviadar imporar `fs`.
* Transformamos el `payload` en un __JSON__.
````
guardarDB() {
    const payload = {
        historial: this.historial
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
}
````
*  Creamos un metodo `agregarHistorial()` donde le pasamos un string.
* Realizamos una validación para no registrar busquedas repetidas, convirtiendo la cadena de texto en minúscula, para luego hacer una comparación si existe una cadena igual ya registrada, en ese caso retorna, y no se guarda.
* Para agruegar al inicio del arrelgo `historial` usamos `.unshift()`, tambien le pasamos minúscual, para que se pueda hacer la comparación correctamente.
* Invocamos la función anteiormente mostrada para registrar en el file __JSON__.
````
agregarHistorial( lugar = ''){
    if(this.historial.includes( lugar.toLocaleLowerCase() ) ){
        return;
    }
    this.historial.unshift(lugar.toLocaleLowerCase() );

    this.guardarDB();
}
````
En el file __index.js__.
* Dentro del `case 1:` despues de ingresar el nombre de la ciuidad, invocamos el metodo `agregarHistorial()` para reguistrar el nuevo nombre en el arreglo y luego guardarlo en el documento JSON.
````
busquedas.agregarHistorial(lugarSel.nombre);
````
* En el `case 2:` realizamos una busqueda del arreglo `historial[]` con ayuda de un __forEach__, donde le ponemos una id y mostramos los lugares registrados, esto es para mostrar los datos por pantalla.
````
case 2:
    busquedas.historial.forEach( (lugar, id) => {
        const idx = `${ id + 1}.`.brightGreen;
        console.log(`${idx} ${ lugar }`);
    })
break;
````
# 
### 8.- Leer Archivo JSON:
Ahora leeremos el archivos con los datos registrados.
* Se crea el metodo `leerDB()`, en la clase `busquedas`.
* Se hará una condicion para verificar la existencia del documento __.JSON__.
* Luego con ayuda de __fs__, leeremos el documento usando `readFileSync`.
* Realizamos la trasformación a un objeto con `JSON.parse`.
* Luego le pasamos los `datos.historial` ya que viene en un arreglo.
````
leerDB(){
        if(!fs.existsSync(this.dbPath) ) return;
        
        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'} ); 
        const data = JSON.parse(info);
        
         this.historial = data.historial;
    }
````
* Le pasamos al constructor el methodo creado `leerDB()`.
````
 constructor(){
        this.leerDB();
    }
````
Para realizar la capitalización de las palabras es necesario hacer lo siguiente;
* Creamos un __Get__ con nombre `historialCapitalizado()`.
* Retornar `this.historial` con ayuda del `.map()` para hacer un nuevo arreglo.
* Usamos `.split(' ')`, para hacer el corte del arreglo por los espacios.
* Realizamos otro `.map()` para retornar la primera palabra y usar `.toUpperCase()` y luego sumarle toda la palabra con `p.substring(1)`, con esto logramos __Capitalizar Cada una de las Palabras__.
* realizamos un return, con un __join__, para volver a unir el arreglo que se separo con `.split()`.

````
get historialCapitalizado(){
    return this.historial.map( lugar => {
        
        let palabras = lugar.split(' ');
        palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));
        
        return palabras.join(' ');
    });
}
````
En __index.js__ de la aplicación;
* En el `case 2:`, remplazamos `historial` por el __Get__ `historialCapitalizado()` que realizamos para la capitalización de las palabras.
````
busquedas.historialCapitalizado.forEach( (lugar, id) => {...}
````
Adiconalmente en el metodo `agregarHistorial()` de la clase busquedas, realizaremos una limitación del historial, para mostrar un historial de busqueda limitado.
* El metodo `.splice(0,5)` elimina los elementos del arreglo `this.historial`, manteniendo solo 6 elementos.
````
this.historial = this.historial.splice(0,5);
````
#