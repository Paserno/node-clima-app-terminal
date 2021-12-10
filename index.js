const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");





const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar Mensaje
                const lugar = await leerInput('Ciudad: ');
                console.log(lugar);
                // Buscar los lugares
                // Seleccionar el lugar
                // Clima
                // Mostrar Resultados
                console.log('\nInformacion de la Ciudad\n'.brightMagenta);
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng:');
                console.log('Temperatura:');
                console.log('Minima:');
                console.log('Maxima:');

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