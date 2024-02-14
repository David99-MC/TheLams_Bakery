import { useForm } from "react-hook-form"
import Button from "../../ui/Button"
import LinkButton from "../../ui/LinkButton"
import { login } from "../../services/api_server"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../utils/reduxHooks"
import { updateUser } from "./userSlice"
import { useState } from "react"

type LoginData = {
  username: string
  password: string
}

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<LoginData>()
  const [isLoading, setIsLoading] = useState(false)
  async function onFormSubmit(data: LoginData) {
    setIsLoading(true)
    const authenticatedUser = await login(data)
    if (authenticatedUser) {
      dispatch(updateUser({ username: data.username, signedIn: true }))
      navigate("/menu")
    } else {
      alert("wrong username or password")
    }
    setIsLoading(false)
  }
  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-2 rounded-md bg-white px-0 py-10">
      <p className="text-lg font-bold tracking-widest">The Lam's Bakery</p>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mb-2 flex w-6/12 flex-col gap-2"
      >
        <input
          id="username"
          placeholder="username"
          type="text"
          className="input w-full"
          {...register("username", { required: true })}
        />
        <input
          id="password"
          placeholder="password"
          type="password"
          className="input"
          {...register("password", { required: true })}
        />
        <Button disabled={isLoading} type="primary">
          {isLoading ? "Loggin you in..." : "Login"}
        </Button>
      </form>
      <LinkButton to="/signup">Sign up instead?</LinkButton>
    </div>
  )
}

export default Login
