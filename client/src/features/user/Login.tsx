import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks"
import { setCredentials, type userError } from "./userSlice"
import { useEffect } from "react"
import Button from "../../ui/Button"
import LinkButton from "../../ui/LinkButton"
import toast from "react-hot-toast"
import { useLoginMutation, type authData } from "./userApiSlice"
import { setCart } from "../cart/cartSlice"

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<authData>()

  const { fullName } = useAppSelector((state) => state.user) ?? {}

  // automatically redirect to menu if user is already logged in
  useEffect(() => {
    if (fullName) {
      navigate("/menu")
    }
  }, [fullName, navigate])

  const [login, { isLoading }] = useLoginMutation()

  // login user with dispatch function
  async function onFormSubmit(data: authData) {
    try {
      const { user, accessToken, cart } = await login(data).unwrap()
      console.log("user:", user)
      dispatch(
        setCredentials({
          fullName: user.fullName,
          isAdmin: user.isAdmin,
          accessToken,
        })
      )
      dispatch(setCart(cart))

      navigate("/menu")
    } catch (err) {
      const errorMessage = (err as userError).data?.message
      toast.error(errorMessage || "Something went wrong")
    }
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
