import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'projects' }, // Redirige a la lista de proyectos
    component: ProjectsLayout, // Layout principal para agrupar las rutas
    children: [
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/modules/projects/views/ProjectsView.vue'),
      },
      {
        path: 'proyecto/:id', // Ruta dinámica con parámetro de proyecto
        name: 'proyectoID',
        component: () => import('@/modules/projects/views/ProjectView.vue'),
        props: true, // Habilita que el ID se pase como prop
      },
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Usa historial del navegador
  routes,
});

export default router;
