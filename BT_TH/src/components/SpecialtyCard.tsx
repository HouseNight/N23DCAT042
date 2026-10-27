import type { Specialty } from '../data/specialties'

type SpecialtyCardProps = {
  specialty: Specialty
}

function SpecialtyCard({ specialty }: SpecialtyCardProps) {
  return (
    <article className="specialty-card">
      <h3>{specialty.name}</h3>
      <p>{specialty.description}</p>
    </article>
  )
}

export default SpecialtyCard
