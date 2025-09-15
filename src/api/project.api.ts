import type { Project } from "../types/project"
import { http } from "./http"

// 案件作成
export async function createProject(name: string): Promise<Project> {
  const res = await http.post<Project>('/projects', { name })
  return res.data
}

// 案件一覧取得
export async function getProjects(): Promise<Project[]> {
  const res = await http.get<Project[]>('/api/data/projects.json')
  return res.data
}

// 案件詳細取得
export async function getProject(id: string): Promise<Project> {
  const res = await http.get<Project>(`/api/data/project-${id}.json`)
  return res.data
}