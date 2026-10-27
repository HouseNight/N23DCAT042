import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import SpecialtyCard from '../components/SpecialtyCard'
import type { Specialty } from '../data/specialties'
import { getErrorMessage } from '../services/api'
import {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from '../services/specialtyService'

function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // GET khi trang được mở.
  useEffect(() => {
    let active = true

    async function load() {
      try {
        const data = await getSpecialties()

        if (active) {
          setSpecialties(data)
        }
      } catch (error) {
        if (active) {
          setError(getErrorMessage(error))
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  function resetForm() {
    setName('')
    setDescription('')
    setEditingId(null)
  }

  function startEdit(specialty: Specialty) {
    setEditingId(specialty.id)
    setName(specialty.name)
    setDescription(specialty.description)
    setError('')
  }

  // POST khi thêm mới, PUT khi đang sửa.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const input = {
      name: name.trim(),
      description: description.trim(),
    }

    if (!input.name || !input.description) {
      setError('Vui lòng nhập đầy đủ tên và mô tả.')
      return
    }

    setSaving(true)
    setError('')

    try {
      if (editingId === null) {
        const created = await createSpecialty(input)

        setSpecialties(current => [...current, created])
      } else {
        const updated = await updateSpecialty(editingId, input)

        setSpecialties(current =>
          current.map(item =>
            item.id === updated.id ? updated : item,
          ),
        )
      }

      resetForm()
    } catch (error) {
      setError(getErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  // DELETE chuyên khoa.
  async function handleDelete(id: number) {
    if (!window.confirm('Bạn muốn xóa chuyên khoa này?')) {
      return
    }

    setSaving(true)
    setError('')

    try {
      await deleteSpecialty(id)

      setSpecialties(current =>
        current.filter(item => item.id !== id),
      )

      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      setError(getErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Chuyên khoa</h1>
          <p>Tìm hiểu các chuyên khoa được giới thiệu tại SunCare.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>
            {editingId === null
              ? 'Thêm chuyên khoa'
              : 'Cập nhật chuyên khoa'}
          </h2>

          <form onSubmit={handleSubmit}>
            <fieldset disabled={loading || saving}>
              <p>
                <label htmlFor="specialty-name">Tên chuyên khoa</label>
                <br />
                <input
                  id="specialty-name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  maxLength={100}
                  required
                />
              </p>

              <p>
                <label htmlFor="specialty-description">Mô tả</label>
                <br />
                <textarea
                  id="specialty-description"
                  value={description}
                  onChange={event =>
                    setDescription(event.target.value)
                  }
                  maxLength={1000}
                  rows={4}
                  required
                />
              </p>

              <button type="submit">
                {saving
                  ? 'Đang xử lý...'
                  : editingId === null
                    ? 'Thêm chuyên khoa'
                    : 'Lưu thay đổi'}
              </button>

              {editingId !== null && (
                <button type="button" onClick={resetForm}>
                  Hủy sửa
                </button>
              )}
            </fieldset>
          </form>

          {error && <p role="alert">{error}</p>}

          <div className="section-heading">
            <h2>Danh sách chuyên khoa</h2>
            <span>{specialties.length} chuyên khoa</span>
          </div>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <div className="specialty-list">
              {specialties.map(specialty => (
                <div key={specialty.id}>
                  <SpecialtyCard specialty={specialty} />

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => startEdit(specialty)}
                  >
                    Sửa
                  </button>

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => void handleDelete(specialty.id)}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && specialties.length === 0 && (
            <p>Chưa có chuyên khoa nào.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default SpecialtiesPage