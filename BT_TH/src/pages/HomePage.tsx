import { Link } from 'react-router'
import SpecialtyCard from '../components/SpecialtyCard'
import { useEffect, useState } from 'react'
import type { Specialty } from '../data/specialties'
import { getSpecialties } from '../services/specialtyService'
import { getErrorMessage } from '../services/api'

function HomePage() {

  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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


  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Lựa chọn bác sĩ phù hợp với nhu cầu của bạn</h1>
          <p>Tìm hiểu chuyên khoa và khám phá SunCare để chuẩn bị cho lần khám tiếp theo.</p>
          <div className="hero-actions">
            <Link className="button" to="/specialties">Khám phá chuyên khoa</Link>
            <Link className="text-link" to="/about-us">Giới thiệu SunCare</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Chuyên khoa nổi bật</h2>
            <Link className="text-link" to="/specialties">Xem chuyên khoa →</Link>
          </div>
          {loading && <p>Đang tải chuyên khoa...</p>}
          {error && <p role="alert">{error}</p>}
          {!loading && !error && specialties.length === 0 && (
            <p>Chưa có chuyên khoa nào.</p>
          )}
          <div className="specialty-list">
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.id} specialty={specialty} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
