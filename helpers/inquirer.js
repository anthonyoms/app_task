const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value:'1',
                name: '1. Crear tarea'
            },
            {
                value:'2',
                name: '2. Listar tareas'
            },
            {
                value:'3',
                name: '3. Listar tareas completadas'
            },
            {
                value:'4',
                name: '4. Listar tareas pendientes'
            },
            {
                value:'5',
                name: '5. Listar tareas pendientes'
            },
            {
                value:'6',
                name: '6. Borrar tarea'
            },
            {
                value:'0',
                name: '0. salir'
            }
        ]
    }
];

const stopQuestion = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione cualquier ${'enter'.green} para continuar`
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    
    console.log('\n');
    await inquirer.prompt(stopQuestion);
}

module.exports = {
    inquirerMenu,
    pausa
}