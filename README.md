**👉 Play around with the app: https://the-lams-bakery.onrender.com**

In this imaginary bakery, you will be able to: <br>
🍞 Browse fresh bakery products that the store currently offers. <br>
🍞 Add any amount of products to your cart. You're also able to adjust the amount of them while in your cart. <br>
🍞 Check out with your current cart and receive your order receipt (Tip: you can make it a priority order for 20% of your order!). <br>
🍞 After that you should receive and keep your order ID from the receipt to keep track of your order. <br>
🍞 Check out your order ID using the web's built in order searching to know when your order arrive. <br>
🍞 Enjoy your hot and fresh breads!

*NOTE:* Hosting frontend and backend separately causes some new problems that with my current state of knowledge, cannot be figured out. The problem being every the page is refresh, the client will automatically make a request to the current url, as opposed to a backend API.

So far, thanks to [render's document](https://docs.render.com/deploy-create-react-app), I was able to rewrite the request to the correct url.

*The problem that persists:* refreshing the page while logged in will invalidate the jwt and the user will be sent back login page (as how I wanted if any user tries to access any authentication-required page). However, any products that the user has added to cart will stay the same until they check out. So by logging back in, they will still see their order. I apologize for any inconvenience and I will seek out help to solve this. Enjoy! 

💻 Tech stack used: MongoDB, Express, React with Typescript, Node. <br>
📚 Library used with React: Redux with createAPI, React Query, React Hook Form. <br>
💅 Styling: Tailwind CSS. <br>
🔐 Authentication: I used JWT to create access and refresh token for both authenticate the user and login persistent. After logging it, upon which the access token is sent to the frontend and the refresh token is saved into db, the user is free to access any of the site's permitted activities. In the event of access token expired, the site will automatically request a new access token using the refresh token, which is Http Only, allowing the user to keep up the activities without having to login again. Lastly, logging out will immediately invalidate both the access and refresh token.
