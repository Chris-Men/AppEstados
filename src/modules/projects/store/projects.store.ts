import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [] as { id: string, nombre: string, tareas: { nombre: string, fecha: string }[], progreso: number }[],
  }),
  actions: {
    agregarProyecto(nombreProyecto: string) {
      this.proyectos.push({
        id: Date.now().toString(),
        nombre: nombreProyecto,
        tareas: [],
        progreso: 0,
      });
    },
    agregarTarea(proyectoId: string, nombreTarea: string) {
      const proyecto = this.proyectos.find(p => p.id === proyectoId);
      if (proyecto) {
        proyecto.tareas.push({
          nombre: nombreTarea,
          fecha: new Date().toISOString(), // Agrega la fecha actual
        });
        this.actualizarProgreso(proyectoId);
      }
    },
    eliminarTarea(proyectoId: string, index: number) {
      const proyecto = this.proyectos.find(p => p.id === proyectoId);
      if (proyecto) {
        proyecto.tareas.splice(index, 1);
        this.actualizarProgreso(proyectoId);
      }
    },
    actualizarTarea(proyectoId: string, index: number, nuevoNombre: string) {
      const proyecto = this.proyectos.find(p => p.id === proyectoId);
      if (proyecto && proyecto.tareas[index]) {
        proyecto.tareas[index].nombre = nuevoNombre;
      }
    },
    actualizarProgreso(proyectoId: string) {
      const proyecto = this.proyectos.find(p => p.id === proyectoId);
      if (proyecto) {
        proyecto.progreso = (proyecto.tareas.length / 10) * 100;
      }
    },
  },
});
