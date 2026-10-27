import { Link } from 'react-router'

function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Giới thiệu SunCare</h1>
          <p>Chủ động tìm hiểu, an tâm trước mỗi lần khám.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-content">
          <h2>SunCare là gì?</h2>
          <p>
            SunCare hướng đến việc giúp người dùng tìm hiểu thông tin chuyên khoa
            và chủ động chuẩn bị trước khi đi khám.
          </p>
          <p>
            Website giới thiệu ba chuyên khoa mẫu: Tim mạch, Nhi khoa và Da liễu.
            Bạn có thể tìm hiểu từng chuyên khoa qua menu hoặc nút bên dưới.
          </p>
          <Link className="button" to="/specialties">Xem danh sách chuyên khoa</Link>
        </div>
      </section>
    </>
  )
}

export default AboutPage
