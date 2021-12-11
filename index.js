require('dotenv').config()

const colors = require('colors');
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");





const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar Mensaje
                const termino = await leerInput('Ciudad: ');

                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino );

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find( l => l.id === id );
                // console.log(lugarSel);

                // Clima 
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                
                // Mostrar Resultados
                console.clear();
                console.log('\nInformacion de la Ciudad\n'.brightMagenta);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Maxima:', clima.min);
                console.log('Minima:', clima.min);
                console.log('Como esta el clima:', clima.desc.brightGreen);

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


    
}

main();