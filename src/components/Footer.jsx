export default function Footer() {
  return (
    <footer className="container footer">
      <span>© {new Date().getFullYear()} Megana K</span>
      <span className="footer-note">A practice in thoughtful digital craft.</span>
      <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  )
}
