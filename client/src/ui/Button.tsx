import { Link } from "react-router-dom"

type ButtonProps = {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  to?: string
  type: "primary" | "secondary" | "small" | "round"
}

// TODO: REFACTOR THE FUNCTIONALITIES INTO A DIFFERENT BUTTON COMPONENT

function Button({ children, disabled, to, type, onClick }: ButtonProps) {
  const base: string =
    "inline-block rounded-full bg-yellow-400  font-semibold outline-none transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"

  const btnType = {
    primary: base + " px-4 py-3",
    small: base + " px-3 py-2 text-xs",
    round: base + " px-2.5 py-1 text-sm",
    secondary:
      "inline-block rounded-full font-semibold outline-none transition-colors duration-300 text-stone-500 hover:text-stone-800 hover:bg-stone-300 border-stone-300 border-2 focus:bg-stone-300 focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:text-stone-800 disabled:cursor-not-allowed px-3.5 py-2",
  }
  if (to) {
    return (
      <Link to={to} className={btnType[type]}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={btnType[type]}>
        {children}
      </button>
    )
  }

  return (
    <button disabled={disabled} className={btnType[type]}>
      {children}
    </button>
  )
}

export default Button
