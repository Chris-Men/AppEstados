<template>
    <div class="p-6 flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-2xl font-bold mb-4 text-black" >{{ proyecto?.nombre || 'Proyecto no encontrado' }}</h1>
  
      <!-- Mostrar número de tareas -->
      <p class="text-lg mb-4">Tareas: {{ proyecto?.tareas.length || 0 }}</p>
      <p class="text-lg mb-4">Progreso: {{ calcularProgreso() }}%</p>
  
      <!-- Mensaje cuando se alcanza el máximo de tareas -->
      <div v-if="proyecto?.tareas.length >= 10" class="text-red-500 mb-4">
        Has alcanzado el límite de 10 tareas. No se pueden agregar más.
      </div>
  
      <!-- Formulario para agregar tareas -->
      <div class="mb-4 flex gap-5 justify-center" v-if="proyecto?.tareas.length < 10">
        <input
          v-model="nuevaTarea"
          type="text"
          placeholder="Nueva tarea"
          class="input input-bordered w-full max-w-xs"
        />
        <button @click="agregarTarea" class="btn btn-success">
          Agregar
        </button>
      </div>
  
      <!-- Tabla de tareas con fecha y hora -->
      <table class="table-auto w-full border border-gray-300 rounded-md mt-6  text-black" >
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Fecha y Hora</th>
            <th class="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
    <tr v-for="(tarea, index) in proyecto?.tareas || []" :key="index" class="border-t">
      <td class="px-4 py-2 text-center">{{ index + 1 }}</td>
      <td class="px-4 py-2">{{ tarea.nombre }}</td>
      <td class="px-4 py-2">{{ formatearFecha(tarea.fecha) }}</td>
      <td class="px-4 py-2 flex gap-2 justify-center">
        <button @click="editarTarea(index, tarea.nombre)" class="btn btn-secondary btn-sm">
          Actualizar
        </button>
        <button @click="confirmarEliminarTarea(index)" class="btn btn-error btn-sm">
          Eliminar
        </button>
      </td>
    </tr>
  </tbody>
      </table>
  
      <!-- Formulario de actualización -->
      <div v-if="mostrarFormulario" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 class="text-lg font-bold mb-2">Actualizar Tarea</h2>
          <input
            v-model="tareaActualizada"
            type="text"
            class="input input-bordered w-full mb-2"
            placeholder="Editar nombre de tarea"
          />
          <div class="flex gap-2">
            <button @click="guardarActualizacion" class="btn btn-primary">Guardar</button>
            <button @click="cancelarEdicion" class="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>
  
      <!-- Modal de Confirmación de Eliminación -->
      <div v-if="mostrarModalEliminar" class="fixed inset-0 flex items-center justify-center text-black">
        <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 class="text-lg font-bold mb-4">¿Estás seguro?</h2>
          <p class="mb-4">¿Quieres eliminar esta tarea?</p>
          <div class="flex gap-4 justify-center">
            <button @click="eliminarTarea()" class="btn btn-error">Eliminar</button>
            <button @click="cancelarEliminar" class="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>



  
  <script lang="ts" setup>

  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProyectosStore } from '@/modules/projects/store/projects.store';
  
  // Store y rutas
  const proyectosStore = useProyectosStore();
  const route = useRoute();
  const proyectoId = route.params.id as string;
  
  // Obtener el proyecto actual por ID
  const proyecto = computed(() =>
    proyectosStore.proyectos.find((p) => p.id === proyectoId)
  );
  
  // Variables reactivas
  const nuevaTarea = ref('');
  const tareaActualizada = ref('');
  const indiceTarea = ref<number | null>(null);
  const mostrarFormulario = ref(false);
  const mostrarModalEliminar = ref(false);
  const indiceEliminar = ref<number | null>(null);
  
  // Función para agregar una nueva tarea
  const agregarTarea = () => {
  if (nuevaTarea.value.trim() !== '') {
    proyectosStore.agregarTarea(proyectoId, nuevaTarea.value); // Pasa solo el nombre de la tarea
    nuevaTarea.value = '';
  }
};
  
  // Función para confirmar la eliminación de una tarea
  const confirmarEliminarTarea = (index: number) => {
    indiceEliminar.value = index;
    mostrarModalEliminar.value = true;
  };
  
  // Función para eliminar una tarea
  const eliminarTarea = () => {
    if (indiceEliminar.value !== null) {
      proyectosStore.eliminarTarea(proyectoId, indiceEliminar.value);
      cancelarEliminar();
    }
  };
  
  // Función para cancelar la eliminación
  const cancelarEliminar = () => {
    mostrarModalEliminar.value = false;
    indiceEliminar.value = null;
  };
  
  // Función para iniciar la edición de una tarea
  const editarTarea = (index: number, nombre: string) => {
    indiceTarea.value = index;
    tareaActualizada.value = nombre;
    mostrarFormulario.value = true;
  };
  
  // Función para guardar la tarea actualizada
  const guardarActualizacion = () => {
    if (indiceTarea.value !== null && tareaActualizada.value.trim() !== '') {
      proyectosStore.actualizarTarea(proyectoId, indiceTarea.value, tareaActualizada.value);
      cancelarEdicion();
    }
  };
  
  // Función para cancelar la edición
  const cancelarEdicion = () => {
    indiceTarea.value = null;
    tareaActualizada.value = '';
    mostrarFormulario.value = false;
  };
  
  // Función para formatear la fecha
  const formatearFecha = (fecha: string) => {
    if (!fecha) return 'Fecha no disponible';
    const nuevaFecha = new Date(fecha);
    if (isNaN(nuevaFecha.getTime())) return 'Fecha inválida';
    return nuevaFecha.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Función para calcular el progreso
  const calcularProgreso = () => {
    const totalTareas = proyecto.value?.tareas.length || 0;
    return Math.min((totalTareas / 10) * 100, 100);
  };
  </script>
  