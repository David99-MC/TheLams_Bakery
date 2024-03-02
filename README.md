** 👉 Play around with the app: https://the-lams-bakery.onrender.com**

*NOTE:* Hosting frontend and backend separately causes some new problems that with my current state of knowledge, cannot be figured out. The problem being every the page is refresh, the client will automatically make a request to the current url, as opposed to a backend API.

So far, thanks to [render's document](https://docs.render.com/deploy-create-react-app), I was able to rewrite the request to the correct url.

*The problem that persists:* refreshing the page while logged in will invalidate the jwt and the user will be sent back login page (as how I wanted if any user tries to access any authentication-required page). However, any products that the user has added to cart will stay the same until they check out. So by logging back in, they will still see their order. I apologize for any inconvenience and I will seek out help to solve this. Enjoy! 
