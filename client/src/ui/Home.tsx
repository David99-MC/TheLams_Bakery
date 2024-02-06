import CreateUser from "../features/user/CreateUser"
import { useAppSelector } from "../utils/reduxHooks"
import Button from "./Button"

function Home() {
  const username = useAppSelector((state) => state.user.fullName)
  return (
    <div className="mt-16 text-center">
      <h1 className=" mb-8 text-xl font-semibold text-yellow-500 md:text-3xl">
        <span className="text-stone-700">The freshest breads.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering
        </Button>
      )}
    </div>
  )
}

export default Home
