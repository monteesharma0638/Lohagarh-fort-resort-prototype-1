'use server'

// app/actions/zohoLeads.ts
import nodemailer from 'nodemailer';
import path from 'path';
import { waitUntil } from "@vercel/functions";
import fs from 'fs';

async function sendMail(formData: FormData) {

  // NEW: Automate the Email via Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'monteesharma0638@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD, // 16-character code from Google
    },
  });

  const emailFilePath = path.join(process.cwd(), 'email-template' , 'email.html');
  const emailTemplate = fs.readFileSync(emailFilePath, 'utf-8');

  const mailOptions = {
    from: 'monteesharma0638@gmail.com',
    to: formData.get('email') as string,
    subject: 'Thank you for your Enquiry - Lohagarh Group',
    // text: `Hi ${formData.get('firstName')}, we received your message!. We will get back to you shortly.`,
    html: emailTemplate,
      // attachments: [
      //   {
      //     filename: 'resort-view.jpg',
      //     path: path.join(process.cwd(), 'public','drone-lohagarh.jpg'), // Path to your local image
      //     cid: 'hero_image' // Same ID used in the <img src="cid:..."> tag
      //   }
      // ]
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("🚀 ~ sendMail ~ error:", error);
    return { success: true, emailError: true }; // Lead created, but email failed
  }
}

export async function submitToZoho(formData: FormData) {
  const zohoPayload = new FormData();
  
  // Your working tokens
  zohoPayload.append('xnQsjsdp', 'da388b0601a4a6fac11220d98f118933fb01705f76818e25cd770f645ae565b4');
  zohoPayload.append('xmIwtLD', 'be5c2c792124646c0dbbd0dc8e834aad0f04e670850af82bca790e12b9d9aabf76bb1bfb90a0be59540f6624f4e60882');
  zohoPayload.append('actionType', 'TGVhZHM=');
  zohoPayload.append('returnURL', 'null');

  // Field Mapping
  zohoPayload.append('First Name', formData.get('firstName') as string);
  zohoPayload.append('Last Name', formData.get('lastName') as string);
  zohoPayload.append('Email', formData.get('email') as string);
  zohoPayload.append('Company', formData.get('company') as string);
  zohoPayload.append('Mobile', formData.get('mobile') as string);
  zohoPayload.append('Description', formData.get('description') as string);

  try {
    // Adding headers to ensure the server-side request isn't blocked by Zoho's firewall
    const response = await fetch('https://crm.zoho.in/crm/WebToLeadForm', {
      method: 'POST',
      body: zohoPayload,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    // Send the confirmation email after the CRM check
    waitUntil(sendMail(formData));

    return { success: true };
  } catch (error) {
    console.error("Zoho CRM Submission Error:", error);
    return { success: false };
  }
}