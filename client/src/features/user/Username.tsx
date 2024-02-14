import { useAppSelector } from "../../utils/reduxHooks"

function Username() {
  const username = useAppSelector((state) => state.user.username)
  return (
    <div className="hidden font-medium md:block">
      {username ? `Welcome, ${username}!` : ""}
    </div>
  )
}

export default Username
