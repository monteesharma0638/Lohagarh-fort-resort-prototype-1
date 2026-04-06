'use server'

// app/actions/zohoLeads.ts
import nodemailer from 'nodemailer';
import path from 'path';

async function sendMail(formData: FormData) {

  // NEW: Automate the Email via Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'monteesharma0638@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD, // 16-character code from Google
    },
  });

  const mailOptions = {
    from: 'monteesharma0638@gmail.com',
    to: formData.get('email') as string,
    subject: 'Thank you for your Enquiry - Lohagarh Group',
    // text: `Hi ${formData.get('firstName')}, we received your message!. We will get back to you shortly.`,
    html: `<div style="font-family: 'Georgia', serif; color: #333; line-height: 1.6;">
          <h2 style="color: #8B0000;">Greetings from the Heart of Heritage,</h2>
          <p>Thank you for reaching out to the <b>Lohagarh Group of Companies</b>. We have successfully received your enquiry.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <img src="cid:hero_image" alt="Lohagarh Luxury" style="width: 100%; max-width: 600px; border-radius: 8px;">
          </div>

          <p style="font-style: italic; border-left: 4px solid #8B0000; padding-left: 15px; margin: 20px 0;">
            "Where history meets hospitality, and every guest is treated as a sovereign."
          </p>

          <h3 style="color: #8B0000;">Enquiry Details:</h3>
          <ul>
            <li><b>Name:</b> ${formData.get('firstName')} ${formData.get('lastName')}</li>
            <li><b>Interested In:</b> ${formData.get('company')}</li>
          </ul>

          <p>One of our <b>Royal Experience Curators</b> will contact you within 24 hours.</p>
          <hr>
          <p style="font-size: 0.8em; color: #777;">Lohagarh Group | Heritage • Luxury • Beyond</p>
        </div>
      `,
      attachments: [
        {
          filename: 'resort-view.jpg',
          path: path.join(process.cwd(), 'public', 'assets', 'drone-lohagarh.jpg'), // Path to your local image
          cid: 'hero_image' // Same ID used in the <img src="cid:..."> tag
        }
      ]
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
    const response = await Promise.all([fetch('https://crm.zoho.in/crm/WebToLeadForm', {
      method: 'POST',
      body: zohoPayload,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    }),

    // Send the confirmation email after the CRM check
    await sendMail(formData)
    ]);

    return { success: true };
  } catch (error) {
    console.error("Zoho CRM Submission Error:", error);
    return { success: false };
  }
}