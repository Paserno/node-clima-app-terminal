> __Elemento Anterior 👀:__ __[Aplicación de Consola Interactiva 🖥️](https://github.com/Paserno/node-consola-todo-app)__

# Aplicación de Clima ⛅
Esta es una aplicación de clima con ayuda de la API de OpenWeatherMaps.
Elementos Utilizados:
* [Colors.js](https://www.npmjs.com/package/colors)
* [Inquirer.js](https://www.npmjs.com/package/inquirer)
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

