import { Link, NavLink } from 'react-router'

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="brand">SunCare</Link>

        <nav className="nav-links" aria-label="Menu chính">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Trang chủ
          </NavLink>
          <NavLink to="/about-us" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Giới thiệu
          </NavLink>
          <NavLink to="/specialties" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Chuyên khoa
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
