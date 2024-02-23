import { selectCurrentUser } from "../features/user/userSlice"
import { useAppSelector } from "../utils/reduxHooks"
import Button from "./Button"

function Home() {
  const { fullName } = useAppSelector(selectCurrentUser) ?? {}
  return (
    <div className="mt-16 text-center">
      <h1 className=" mb-8 text-xl font-semibold text-yellow-500 md:text-3xl">
        <span className="text-stone-700">The freshest breads.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>
      {!fullName ? (
        <Button type="primary" to="/login">
          Sign in to start ordering!
        </Button>
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering
        </Button>
      )}
    </div>
  )
}

export default Home
