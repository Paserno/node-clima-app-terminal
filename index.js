const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer")





const main = async() => {

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


    
}

main();