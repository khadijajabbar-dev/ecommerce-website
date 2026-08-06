import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  },
});

// Sent right after an order is placed (Buy Now or Checkout).
// Contains a "Confirm Order" link the buyer must click.
export const sendOrderConfirmationEmail = async (buyerEmail, order) => {
  const confirmUrl = `${env.FRONTEND_URL}/order/confirm/${order.confirmationToken}`;

  const mailOptions = {
    from: env.EMAIL,
    to: buyerEmail,
    subject: "Confirm your order",
    html: `
      <h2>Order Confirmation Needed</h2>
      <p>You just placed an order for:</p>
      <h3>${order.productTitle}</h3>
      <p>Quantity: ${order.quantity}</p>
      <p>Total: Rs. ${order.totalAmount}</p>
      <p>Please confirm this order so the seller can start processing it:</p>
      <p>
        <a href="${confirmUrl}" style="display:inline-block;padding:12px 24px;background:#178f95;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
          Confirm Order
        </a>
      </p>
      <p>If you didn't place this order, you can safely ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Sent when the seller marks the order as dispatched.
// Contains a "Track Order" link.
export const sendOrderDispatchedEmail = async (buyerEmail, order) => {
  const trackUrl = `${env.FRONTEND_URL}/buyer/orders/${order._id}/track`;

  const mailOptions = {
    from: env.EMAIL,
    to: buyerEmail,
    subject: "Your order has been dispatched",
    html: `
      <h2>Your order is on its way!</h2>
      <h3>${order.productTitle}</h3>
      <p>Quantity: ${order.quantity}</p>
      <p>Total: Rs. ${order.totalAmount}</p>
      <p>The seller has dispatched your order.</p>
      <p>
        <a href="${trackUrl}" style="display:inline-block;padding:12px 24px;background:#178f95;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
          Track Your Order
        </a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};