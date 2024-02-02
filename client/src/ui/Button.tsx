import { Link } from "react-router-dom"

type ButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  to?: string
}

function Button({ children, disabled, to }: ButtonProps) {
  const className: string =
    "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold outline-none transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  )
}

export default Button
