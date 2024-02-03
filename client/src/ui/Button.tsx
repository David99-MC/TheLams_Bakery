import { Link } from "react-router-dom"

type ButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  to?: string
  type: "primary" | "small"
}

function Button({ children, disabled, to, type }: ButtonProps) {
  const base: string =
    "inline-block rounded-full bg-yellow-400  font-semibold outline-none transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"

  const btnType = {
    primary: base + " px-4 py-3",
    small: base + " px-3 py-2 text-sm",
  }

  if (to)
    return (
      <Link to={to} className={btnType[type]}>
        {children}
      </Link>
    )
  return (
    <button disabled={disabled} className={btnType[type]}>
      {children}
    </button>
  )
}

export default Button
