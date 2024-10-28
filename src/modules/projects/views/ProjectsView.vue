<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proyecto, i) in proyectosStore.proyectos" :key="i" class="hover">
          <th>{{ i + 1 }}</th>
          <td>{{ proyecto.nombre }}</td>
          <td>
            <!-- Muestra el número de tareas actuales y el porcentaje de progreso -->
            <span class="text-lg font-semibold">
              {{ proyecto.tareas.length }} / 10 tareas ({{ Math.min((proyecto.tareas.length / 10) * 100, 100) }}%)
            </span>
          </td>
          <td>
            <progress 
              :value="proyecto.progreso" 
              class="progress progress-primary w-56" 
              max="100"
            ></progress>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modals -->
  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    placeholder="Ingrese el nombre del proyecto"
    title="Nuevo proyecto"
    sub-title="Dale un nombre único a tu proyecto"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h1 class="text-3xl">Titulo del modal</h1>
    </template>

    <template #body>
      <p>
        Nulla consequat non ullamco mollit est quis duis pariatur cupidatat consequat Lorem cillum.
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </custom-modal>

  <fab-button @click="modalOpen = true">
    <AddCircle />
  </fab-button>

  <fab-button @click="customModalOpen = true" position="bottom-left">
    <ModalIcon />
  </fab-button>
</template>

<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';
import { ref } from 'vue';

const modalOpen = ref(false);
const customModalOpen = ref(false);

import { useProyectosStore } from '../store/projects.store';
const proyectosStore = useProyectosStore();

const onNewValue = (nombreProyecto: string) => {
  proyectosStore.agregarProyecto(nombreProyecto);
  modalOpen.value = false; // Cierra el modal después de agregar un nuevo proyecto
}
</script>
