import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const ProjectListView = () => import('@/views/ProjectListView.vue')
const ProjectDetailView = () => import('@/views/ProjectDetailView.vue')
const ProjectCreateView = () => import('@/views/ProjectCreateView.vue') // 既存の作成画面

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/projects' },
  { path: '/projects', name: 'projects-list', component: ProjectListView },
  { path: '/projects/new', name: 'project-new', component: ProjectCreateView },
  { path: '/projects/:id', name: 'project-detail', component: ProjectDetailView, props: true },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router