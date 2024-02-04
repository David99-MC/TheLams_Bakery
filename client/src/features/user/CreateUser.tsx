import { useState } from "react"
import Button from "../../ui/Button"

function CreateUser() {
  const [username, setUsername] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4">👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        className="input mb-6 w-full"
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
