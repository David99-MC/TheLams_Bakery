import { useState } from "react"
import Button from "../../ui/Button"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../utils/reduxHooks"
import { setCredentials } from "./userSlice"

function CreateUser() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!username) return
    dispatch(setCredentials({ username, signedIn: false }))
    navigate("/menu")
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4">👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        className="input mb-6 w-3/5"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  )
}

export default CreateUser
