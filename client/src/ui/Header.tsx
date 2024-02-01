import { Link } from "react-router-dom"
import Username from "../features/user/Username"

function Header() {
  return (
    <header className="bg-yellow-500">
      <Link className="uppercase tracking-widest" to="/">
        The Lam's Bakery
      </Link>
      <br />
      <input type="text" placeholder="Search product" />

      <Username />
    </header>
  )
}

export default Header
