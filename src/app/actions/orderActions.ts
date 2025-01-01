"use server";

import { Resend } from "resend";
import { auth } from "@/app/auth";
import { Artwork } from "@/models/Artwork";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

if (!process.env.ADMIN_EMAIL) {
  throw new Error("Missing ADMIN_EMAIL environment variable");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function sendOrderEmail(items: Artwork[], total: number) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized or missing user email");
    }

    if (!items?.length || typeof total !== "number") {
      throw new Error("Invalid order data");
    }

    // Send email to customer
    const customerEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: session.user.email,
      subject: "Order Confirmation - Orbiting stArt",
      html: `
        <h1>Thank you for your order!</h1>
        <div style="margin: 20px 0;">
          <h2>Customer Details:</h2>
          <p><strong>Email:</strong> ${session.user.email}</p>
          <p><strong>Order Total:</strong> $${total}</p>
        </div>
        <div style="margin: 20px 0;">
          <h2>Order Items:</h2>
          <ul style="list-style: none; padding: 0;">
            ${items
              .map(
                (item) => `
              <li style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                <p style="margin: 5px 0;"><strong>${item.title}</strong> by ${item.artist}</p>
                <p style="margin: 5px 0; color: #6b46c1;">$${item.price}</p>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `,
    });

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "New Order Received - Orbiting stArt",
      html: `
        <h1>New Order Received</h1>
        <p><strong>Customer Email:</strong> ${session.user.email}</p>
        <p><strong>Order Total:</strong> $${total}</p>
        <!-- Rest of admin email template -->
      `,
    });

    return {
      success: true,
      customerEmailId: customerEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to send confirmation email"
    );
  }
}
