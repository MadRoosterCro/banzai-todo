import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCompletionEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_RECIPIENT!,
      subject: "🎉 GREAT SUCCESS! VERY NICE!",
      html: `
        <h1>GREAT SUCCESS! 🎉</h1>
        <p>All your todo items have been completed. <b>High five!</b></p>
        <p><i>Is nice!</i> You work very hard. I like!</p>
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjQzZmt4NG1seWF6ZXhyc216dmt4Z2V3MTkzc3R3ajQ5amcwNGxoNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif" alt="Great Success" style="max-width:100%;height:auto;" />
        <p>Jagshemash,<br/>Your Todo App</p>
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
