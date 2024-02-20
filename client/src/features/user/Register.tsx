import { useForm } from "react-hook-form"
import Button from "../../ui/Button"
import { useNavigate } from "react-router-dom"
import { register as registerUser, reset } from "./userSlice"
import type { userInfo } from "../../services/api_server"
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks"
import { useEffect } from "react"

function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isFetching, errorMessage, username } = useAppSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (errorMessage) {
      // TODO: display error message in a toast
      alert(errorMessage)
    }
    if (username) {
      navigate("/home")
    }
    dispatch(reset())
  }, [errorMessage, username, navigate, dispatch])

  const { register, handleSubmit } = useForm<userInfo>()
  function onFormSubmit(data: userInfo) {
    dispatch(registerUser(data))
  }

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-2 rounded-md bg-white px-0 py-10">
      <p className="text-lg font-bold tracking-widest">The Lam's Bakery</p>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex w-6/12 flex-col gap-2"
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
        <Button disabled={isFetching} type="primary">
          {isFetching ? "Signing you up..." : "Sign up"}
        </Button>
      </form>
    </div>
  )
}

export default Register
