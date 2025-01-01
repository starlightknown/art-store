import { Resend } from "resend";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

if (!process.env.ADMIN_EMAIL) {
  throw new Error("Missing ADMIN_EMAIL environment variable");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized or missing user email" },
        { status: 401 }
      );
    }

    const { items, total } = await request.json();
    if (!items?.length || typeof total !== "number") {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    // Send email to customer
    const customerEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: session.user.email,
      subject: "Order Confirmation - Orbiting stArt",
      html: `
        <h1>Thank you for your order!</h1>
        <p>We've received your order for the following items:</p>
        <ul>
          ${items
            .map(
              (item) =>
                `<li>${item.title} by ${item.artist} - $${item.price}</li>`
            )
            .join("")}
        </ul>
        <p>Total: $${total}</p>
        <p>The artist will contact you shortly to arrange the details.</p>
      `,
    });

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "New Order Received - Orbiting stArt",
      html: `
        <h1>New Order Received!</h1>
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
        <p style="margin-top: 20px; padding: 10px; background: #edf2f7; border-radius: 5px;">
          <strong>Next Steps:</strong> Please contact the customer within 24-48 hours to arrange delivery and payment details.
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
      customerEmailId: customerEmail.id,
      adminEmailId: adminEmail.id,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      {
        error: "Failed to send confirmation email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
