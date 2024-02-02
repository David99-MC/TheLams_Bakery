import CreateUser from "../features/user/CreateUser"

function Home() {
  return (
    <div className="mt-16 text-center">
      <h1 className=" mb-8 text-xl font-semibold text-yellow-500 md:text-3xl">
        <span className="text-stone-700">The freshest breads.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>
      <CreateUser />
    </div>
  )
}

export default Home
