import { defineStore } from 'pinia'
import { getProjects, getProject, createProject } from '../api/project.api'
import type { Project } from '../types/project'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[],
    byId: new Map<string, Project>(),
    loading: false as boolean,
  }),
  getters: {
    list(state): Project[] { return state.projects },
    getCached: (state) => (id: string) => state.byId.get(id),
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const list = await getProjects()
        this.projects = list
        this.byId = new Map(list.map(p => [p.projectId, p]))
      } finally {
        this.loading = false
      }
    },
    async fetchById(id: string) {
      // 既にキャッシュがあればそのまま返す。なければAPIへ
      if (this.byId.has(id)) return this.byId.get(id)!
      const p = await getProject(id)
      this.byId.set(id, p)
      return p
    },
    async create(name: string) {
      const p = await createProject(name)
      this.projects.unshift(p)
      this.byId.set(p.projectId, p)
      return p
    },
  },
})