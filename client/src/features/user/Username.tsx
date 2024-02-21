import { useAppSelector } from "../../utils/reduxHooks"

function Username() {
  const { fullName } = useAppSelector((state) => state.user)
  return (
    <div className="hidden font-medium md:block">
      {fullName ? `Welcome, ${fullName}!` : ""}
    </div>
  )
}

export default Username
