> __Elemento Anterior 👀:__ __[Aplicación de Consola Interactiva 🖥️](https://github.com/Paserno/node-consola-todo-app)__

# Aplicación de Clima ⛅
Esta es una aplicación de clima con ayuda de la API de OpenWeatherMaps.
Elementos Utilizados:
* [Colors.js](https://www.npmjs.com/package/colors)
* [Inquirer.js](https://www.npmjs.com/package/inquirer)
* [Axios](https://www.npmjs.com/package/axios)
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
### 3.- Realizar Peticiones HTTP desde Node:
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
* Se encerro en un __try-catch__ en caso de tener algun tipo de error poder capturarlo.
````
try {
    // Peticion HTTP
    const resp = await axios.get('https://reqres.in/api/users?page=2');
    console.log(resp.data);

    return [];
            
} catch (error) {
    return [];
            
}
````
Ahora en __index.js__ de la aplicación.
* En el __Switch__ `case 1:` se inserto el metodo de __Busquedas__ `ciudad()`.
* Para realizar las pruebas, se puso el `console.log` en el metodo `ciudad()`.
````
const lugar = await leerInput('Ciudad: ');
await busquedas.ciudad( lugar );
```` 