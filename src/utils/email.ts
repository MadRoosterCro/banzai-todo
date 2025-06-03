import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCompletionEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_RECIPIENT!,
      subject: "All Todos Completed!",
      html: `
        <h1>Congratulations, great success!</h1>
        <p>All the todo items have been completed!</p>
      `,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
