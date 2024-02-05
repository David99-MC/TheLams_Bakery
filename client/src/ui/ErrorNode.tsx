import { useNavigate } from "react-router-dom"

function ErrorNode({ message }: { message: string }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="my-10 space-y-4 bg-stone-300 p-8">
        <h1 className="text-2xl font-semibold">Something went wrong 😢</h1>
        <p>{message}</p>
      </div>
      <button
        className="text-blue-600 hover:text-blue-900 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </>
  )
}

export default ErrorNode
