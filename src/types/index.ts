export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  link?: string
  image?: string
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'design' | 'other'
}

export interface Experience {
  id: number
  company: string
  role: string
  period: string
  description: string
}