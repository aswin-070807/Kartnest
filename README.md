# KartNest Checkout Plus

Extend the existing KartNest project. Do NOT rewrite or restyle existing files. Add only the following.

1. "/checkout" with 3 steps (Address, Payment, Review). It works for both the cart flow and the Buy Now flow.
   - Address: full name, mobile (10 digits), pincode (6 digits), house and street, area, city, state (Indian states dropdown), address type Home/Work. Inline validation.
   - Payment (radio cards): UPI (validate name@bank), Card (auto-spaced number, name, expiry MM/YY, CVV, hint 4111 1111 1111 1111), Net Banking (bank dropdown), Cash on Delivery (₹40 fee).
   - Review: items, address, payment mode, price breakdown, and a "Pay ₹X" button.
   - On pay, show a 2-second "Processing your demo payment…" spinner, then go to success. Add a small "Simulate payment failure" checkbox with a retry.
   - Permanent note: "This is a demo. No real money is charged."
2. "/order-success/:orderId": an animated green check (CSS only), "Order placed successfully!", order ID (KN-2026-XXXXXX), transaction ID, amount, payment mode, address, estimated delivery date and item summary. Buttons: "Track Order", "Continue Shopping".
3. "/track/:orderId": a 5-stage stepper (Order Placed, Packed, Shipped, Out for Delivery, Delivered) with timestamps, a demo courier name, a tracking number and an event timeline. The status advances automatically every 25 seconds from the order time, plus a "Simulate next stage" button.
4. "/orders": order list with status badges and a Cancel button (before Shipped) with a confirmation dialog.
5. Store orders in the persisted Zustand store. Reduce stock on order. Clear the cart only when the order came from the cart.

Make sure the preview still works. Reply in 4 lines.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60b7bda7-1d56-496d-ae91-1b050d6e4816).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
