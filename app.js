require('colors');


const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCompletar
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas')


console.clear();

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas
        tareas.carargarTareas(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripcion:');
                console.log(desc);
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await listadoTareasCompletar(tareas.listadoArr);
                tareas.toggleCompleted(ids);
                break;
            case '6':

                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Esta seguro?');
                    if (ok) {
                        tareas.borrarTareasById(id);
                        console.log('Tarea borrado correctamente');
                    }
                }

                break;
        }

        guardarDB( tareas.listadoArr);

        await pausa();

    } while (opt !== '0')

}

main();