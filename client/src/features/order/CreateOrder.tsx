import { useState } from "react"
import Button from "../../ui/Button"

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <form>
        <div>
          <label>First Name</label>
          <input type="text" className="input" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" className="input" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              placeholder="1234 st, OG"
              className="input"
              required
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder
