import { Link } from "react-router-dom"

type LinkButtonProps = {
  children: React.ReactNode
  to: string
}

function LinkButton({ children, to }: LinkButtonProps) {
  return (
    <Link to={to} className="text-blue-600 hover:text-blue-900 hover:underline">
      {children}
    </Link>
  )
}

export default LinkButton
