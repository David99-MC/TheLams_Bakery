import { useState } from "react"
import Button from "../../ui/Button"
import { useAppSelector } from "../../utils/reduxHooks"

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const username = useAppSelector((state) => state.user.fullName)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            className="input grow"
            name="customer"
            placeholder="John Doe"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <input
            type="tel"
            className="input grow"
            name="phone"
            placeholder="123-456-7890"
            required
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <input
            type="text"
            name="address"
            placeholder="1234 st, OG"
            className="input grow"
            required
          />
        </div>

        <div className="mb-10 flex items-center gap-3">
          <input
            type="checkbox"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            name="priority"
            id="priority"
            value={`${withPriority}`}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Make this order priority</label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Place order"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder
