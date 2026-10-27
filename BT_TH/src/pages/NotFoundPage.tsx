import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="not-found container">
      <h1>404 - Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập chưa có trong SunCare.</p>
      <Link className="button" to="/">Về trang chủ</Link>
    </section>
  )
}

export default NotFoundPage
