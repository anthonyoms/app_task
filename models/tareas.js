const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor() {

        this._listado = {};
    }

    borrarTareasById(id = '') {

        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    carargarTareas(tareas = []) {

        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;
        })

    }

    listadoCompleto() {

        this.listadoArr.forEach((tarea, index) => {

            const idx = `${(index + 1)}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`)

        })
    }

    listarPendientesCompletadas(completadas = true) {

        let count = 1;

        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

            if (completadoEn && completadas) {
                console.log(`${(count + '.').green} ${desc} :: ${completadoEn.green}`)
                count++;
            }
            else if (!completadoEn && !completadas) {
                console.log(`${(count + '.').red} ${desc} :: ${estado}`)
                count++;
            }



        })
    }

    toggleCompleted (ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];

            if (!tarea.completadoEn) {

                tarea.completadoEn = new Date().toISOString();
                
            }

        })

    }
}

module.exports = Tareas;