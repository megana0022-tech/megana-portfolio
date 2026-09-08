export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="container navigation" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="Megana home">MEGANA</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}
