import { api } from './api'
import type {
  Specialty,
  SpecialtyInput,
} from '../data/specialties'

// GET: lấy danh sách.
export async function getSpecialties(): Promise<Specialty[]> {
  const response = await api.get<Specialty[]>('/specialties')
  return response.data
}

// GET: lấy một chuyên khoa.
export async function getSpecialty(id: number): Promise<Specialty> {
  const response = await api.get<Specialty>(`/specialties/${id}`)
  return response.data
}

// POST: thêm mới.
export async function createSpecialty(
  input: SpecialtyInput,
): Promise<Specialty> {
  const response = await api.post<Specialty>('/specialties', input)
  return response.data
}

// PUT: cập nhật.
export async function updateSpecialty(
  id: number,
  input: SpecialtyInput,
): Promise<Specialty> {
  const response = await api.put<Specialty>(
    `/specialties/${id}`,
    input,
  )
  return response.data
}

// DELETE: xóa.
export async function deleteSpecialty(id: number): Promise<void> {
  await api.delete(`/specialties/${id}`)
}