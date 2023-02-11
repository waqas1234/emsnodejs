const { MailtrapClient } = require("mailtrap");
const TOKEN = "7f52e6a1024334bd5c53c649ec7686e3";
const SENDER_EMAIL = "waqas.j@webslice.net";
const RECIPIENT_EMAIL = "waqasjamil032@gmail.com";

const mailtrap = new MailtrapClient(TOKEN);

const sendEmail = async () => {
  const message = {
    from: SENDER_EMAIL,
    to: RECIPIENT_EMAIL,
    subject: "Hello from Mailtrap",
    text: "Hello from Mailtrap",
    html: "<h1>Hello from Mailtrap</h1>",
  };

  const response = await mailtrap.sendEmail(message);
  console.log(response);
};
