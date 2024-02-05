import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 4242;
const app = express();
dotenv.config();
const stripeKey = process.env.STRIPE_SECRET_KEY;

// Unlike Node scripts where __dirname retrieves the current file's directory path,
// this feature is unavailable in ES modules, leading to the "__dirname is not defined in ES module scope" error.
// To address this issue and get the equivalent of __dirname in an ES module, we can use the import.meta.url property
// along with the fileURLToPath and path.dirname functions:

// fileURLToPath is a function that takes a file URL (in this case, obtained from import.meta.url) and converts it to a file path.
const __filename = fileURLToPath(import.meta.url);

// This line extracts the directory name from the file path, effectively giving you the equivalent of __dirname.
const __dirname = path.dirname(__filename);

// This line tells Express to serve static files from the 'public' directory.
// Static files can include things like HTML, CSS, images, and client-side JavaScript files.
// This middleware is essential for serving the frontend part of a web application.
app.use(express.static(path.join(__dirname, "public")));

// When extended is set to false, express uses the query-string library for parsing URL-encoded data.
// The query-string library is simpler and more lightweight than the alternative (qs library with extended: true).
// If your application doesn't need to handle complex nested objects in the URL-encoded data,
// using extended: false with query-string can result in slightly better performance and less overhead.
app.use(express.urlencoded({ extended: false }));

// express.json() is a built-in middleware in Express.js that parses incoming requests with JSON payloads.
// When a client sends a POST or PUT request with a JSON payload in the request body,
// this middleware will parse the JSON data and make it available in the req.body property.
app.use(express.json());

// This line adds middleware to enable Cross-Origin Resource Sharing (CORS).
// origin: true: This allows requests from any origin. It sets the Access-Control-Allow-Origin header
// to the value of the Origin header in the incoming request, which effectively allows requests from any domain.
// credentials: true: This indicates that the server is willing to accept credentials (like cookies or HTTP authentication)
// from the client. This involves setting the Access-Control-Allow-Credentials header to true.
app.use(cors({ origin: true, credentials: true }));

const stripe = new Stripe(stripeKey);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100, // Stripe expects the price in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",

      // If we include the ".html" extension in the URLs, we won't need explicit app.get routes to handle those routes,
      // because Express will automatically serve the HTML files from the public directory
      // (since we added the express.static middleware earlier).
      success_url: "https://pokemon-store-antonio-api.vercel.app/success.html",
      cancel_url: "https://pokemon-store-antonio-api.vercel.app/cancel.html",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => console.log("Server is running on port " + port));
