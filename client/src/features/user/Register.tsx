import { useForm } from "react-hook-form"
import Button from "../../ui/Button"
import { useMutation } from "@tanstack/react-query"
import { signUp } from "../../services/api_server"
import { useNavigate } from "react-router-dom"

type SignupData = {
  username: string
  password: string
}
function Register() {
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/login")
    },
  })
  const { register, handleSubmit } = useForm<SignupData>()
  function onFormSubmit(data: SignupData) {
    mutate(data)
  }
  return (
    <div className="mt-48 flex flex-col items-center justify-center gap-2 rounded-md bg-white px-0 py-10">
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
        <Button disabled={isLoading} type="primary">
          {isLoading ? "Signing you up..." : "Sign up"}
        </Button>
      </form>
    </div>
  )
}

export default Register
