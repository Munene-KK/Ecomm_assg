import nodemailer from "nodemailer";

const transporter = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT ?? 587),
      secure: Number(process.env.EMAIL_PORT ?? 587) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

export const sendOrderConfirmationEmail = async ({
  userEmail,
  name,
  total,
  orderId,
}: {
  userEmail: string;
  name: string;
  total: number;
  orderId: string;
}) => {
  if (!transporter) {
    console.info(`Email notification skipped for ${userEmail}. Set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS to enable it.`);
    return { skipped: true };
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM ?? "Infinyte <noreply@infinyte.local>",
    to: userEmail,
    subject: `Your Infinyte order #${orderId} has been placed`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #d61f39;">Thanks for shopping with Infinyte</h2>
        <p>Hello ${name},</p>
        <p>Your order has been placed successfully.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total:</strong> Ksh.${total.toLocaleString("en-US")}</p>
        <p>We will contact you soon with delivery updates.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
