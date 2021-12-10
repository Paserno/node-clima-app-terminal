const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
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
        ]
    }
]


const inquirerMenu = async () => {

    console.clear();
    console.log('=========================='.brightGreen);
    console.log('  Seleccionar una Opcion  '.brightWhite);
    console.log('=========================='.brightGreen);
   

    const { opcion } = await inquirer.prompt(menuOpts);

    return opcion;
}


const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.brightGreen} para continuar...`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
    // type: 'input',
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor uwu';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

//---------------------------------------------------------------------------------------------
const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}`.brightGreen;

        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`
        }
    });

    choices.unshift({
            value: '0',
            name: '0.'.brightGreen + ' Cancelar'
        });

    const pregutas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(pregutas);

    return id;
}
//---------------------------------------------------------------------------------------------
const confirmarBorrar = async(mensaje) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}
//---------------------------------------------------------------------------------------------
const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}`.brightGreen;

        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });


    const preguta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguta);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrar,
    mostrarListadoChecklist
}