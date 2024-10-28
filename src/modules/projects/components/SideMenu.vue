<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p v-if="proyectosStore.proyectos.length === 0" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Lista de proyectos -->
    <ul class="menu">
      <li v-for="(proyecto, index) in proyectosStore.proyectos" :key="index" class="my-2">
        <div class="flex justify-between items-center">
          <!-- Enlace al proyecto -->
          <router-link
            :to="{ name: 'proyectoID', params: { id: proyecto.id } }"
            class="flex-grow"
          >
            {{ index + 1 }}. {{ proyecto.nombre }}
          </router-link>
          
          <!-- Botón para agregar tarea -->
          <button @click="proyectosStore.agregarTarea(index)" class="btn btn-sm btn-pink ml-2">
            +1
          </button>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProyectosStore } from '@/modules/projects/store/projects.store';
const proyectosStore = useProyectosStore();
</script>
