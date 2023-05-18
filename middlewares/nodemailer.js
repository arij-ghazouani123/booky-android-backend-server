import nodemailer from "nodemailer";
import env from 'dotenv';




export async function  sendConfirmationEmail (email,activationCode)  {

  try {
    const transporter = nodemailer.createTransport({

      service: "Gmail",
      auth: { 

        user:"justfortesthamza@gmail.com",
        pass: "wwowmsfzzttywxvh", 
      },
     // tls: {rejectUnauthorized: false}
 
    });

    await transporter.sendMail({

     from: "arij.ghazouani22@gmail.com",
      to: email,
      subject: "Please confirm your account",
      text: "Email Confirmation " ,
       html: `<h1> This is your code </h1>
        <h2>Hello Sir </h2>
        <h3> ${activationCode}</h3>`,
    });
    
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export default sendConfirmationEmail;