import { useForm } from "react-hook-form"
import Button from "../../ui/Button"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks"
import { useEffect } from "react"
import { setCredentials, type userError } from "./userSlice"
import toast from "react-hot-toast"
import LinkButton from "../../ui/LinkButton"
import { setCart } from "../cart/cartSlice"
import { useRegisterMutation } from "./userApiSlice"

export type userInfo = {
  fullName: string
  username: string
  password: string
}

function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [registerUser, { isLoading }] = useRegisterMutation()
  const { fullName } = useAppSelector((state) => state.user) ?? {}

  useEffect(() => {
    if (fullName) {
      navigate("/menu")
    }
  }, [fullName, navigate])

  const { register, handleSubmit } = useForm<userInfo>()
  async function onFormSubmit(data: userInfo) {
    try {
      const { user, accessToken, cart } = await registerUser(data).unwrap()
      dispatch(
        setCredentials({
          fullName: user.fullName,
          isAdmin: user.isAdmin,
          accessToken,
        })
      )
      dispatch(setCart(cart))
      navigate("/menu")
      toast.success(`Welcome, ${user.fullName}!`)
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
        className="flex w-6/12 flex-col gap-2"
      >
        <input
          id="fullName"
          placeholder="Full Name"
          type="text"
          className="input w-full"
          {...register("fullName", { required: true })}
        />
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
          className="input w-full"
          {...register("password", { required: true })}
        />
        <Button disabled={isLoading} type="primary">
          {isLoading ? "Signing you up..." : "Sign up"}
        </Button>
        <div className="mt-2 self-center">
          <LinkButton to="/login">Login instead?</LinkButton>
        </div>
      </form>
    </div>
  )
}

export default Register
