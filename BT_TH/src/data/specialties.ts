export type Specialty = {
  id: number
  name: string
  description: string
}

export type SpecialtyInput = Omit<Specialty, 'id'>