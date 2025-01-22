import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();

    // Check if necessary fields are present
    const requiredFields = [
      'quantity', 'length', 'width', 'height', 'weight', 'date', 'yourName', 'businessName', 'address'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Create a transporter using Gmail SMTP service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Define the email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'andrew.n@tegral.com.au, idndhoang@gmail.com',
      subject: 'New Order Information',
      text: `
        New Order Information:
        Quantity: ${formData.quantity}
        Length: ${formData.length} mm
        Width: ${formData.width} mm
        Height: ${formData.height} mm
        Weight: ${formData.weight} kg
        Date: ${formData.date}
        Your Name: ${formData.yourName}
        Business Name: ${formData.businessName}
        Address: ${formData.address}
      `,
      html: `
        <body bgcolor="#0f3462" style="margin-top:20px;margin-bottom:20px">
          <table border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="white" width="650">
            <tr>
              <td>
                <!-- Child table -->
                <table border="0" cellspacing="0" cellpadding="0" style="color:#0f3462; font-family: sans-serif;">
                  <tr>
                    <td style="text-align: center;">
                      <h1 style="margin: 0px;padding-bottom: 25px; text-transform: uppercase;">New Order Information</h1>
                      
                      <h2 style="margin: 0px;padding-bottom: 25px;font-size:22px;">Information Contact</h2>
                      <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
                        <tr><td style="text-align: left;padding: 8px; background-color: #f9f9f9; font-weight: bold;">Date:</td><td style="padding: 8px; background-color: #f9f9f9;">${formData.date}</td></tr>
                        <tr><td style="text-align: left;padding: 8px; background-color: #f4f4f4; font-weight: bold;">Name:</td><td style="padding: 8px; background-color: #f4f4f4;">${formData.yourName}</td></tr>
                        <tr><td style="text-align: left;padding: 8px; background-color: #f9f9f9; font-weight: bold;">Business Name:</td><td style="padding: 8px; background-color: #f9f9f9;">${formData.businessName}</td></tr>
                        <tr><td style="text-align: left;padding: 8px; background-color: #f4f4f4; font-weight: bold;">Address:</td><td style="padding: 8px; background-color: #f4f4f4;">${formData.address}</td></tr>
                      </table>
                      
                      <h2 style="margin: 0px;padding-top: 25px;padding-bottom: 25px;font-size:22px;">Please review the details below</h2>
                      <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
                        <tr><td style="text-align: left;padding: 8px; background-color: #f4f4f4; font-weight: bold;">Quantity:</td><td style="padding: 8px; background-color: #f4f4f4;">${formData.quantity}</td></tr>
                        <tr><td style="text-align: left;padding: 8px; background-color: #f9f9f9; font-weight: bold;">Length:</td><td style="padding: 8px; background-color: #f9f9f9;">${formData.length} mm</td></tr>
                        <tr><td style="text-align: left;padding: 8px; background-color: #f4f4f4; font-weight: bold;">Width:</td><td style="padding: 8px; background-color: #f4f4f4;">${formData.width} mm</td></tr>
                        <tr><td style="text-align: left;padding: 8px; background-color: #f9f9f9; font-weight: bold;">Height:</td><td style="padding: 8px; background-color: #f9f9f9;">${formData.height} mm</td></tr>
                        <tr><td style="text-align: left;padding: 8px; background-color: #f4f4f4; font-weight: bold;">Weight:</td><td style="padding: 8px; background-color: #f4f4f4;">${formData.weight} kg</td></tr>                        
                      </table>
                   
                    </td>
                  </tr>
                
                </table>
                <!-- /Child table -->
              </td>
            </tr>
          </table>
        </body>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    // Handle unexpected errors
    console.error('Unknown error', error);
    return NextResponse.json({ message: 'Failed to send email', error: 'Unknown error' }, { status: 500 });
  }
}
