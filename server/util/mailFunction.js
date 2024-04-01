const mailSender = require("./mailSender");

const sendOTPMail = async (email, otp) => {
  const mailResponse = await mailSender(
    email,
    "Email Verification",
    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }

            h2 {
              font-weight:500;
              color: #6b7280;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            }
    
            .logo {
                display: block;
                margin: 0 auto 20px;
            }
    
            .header {
                background-color: #4caf50;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                text-align: left;
            }
    
            .otp-content {
                margin-top: 30px;
                font-size: 18px;
                color: #333;
                text-align: left;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                padding: 20px;
                border-radius: 5px;
            }

            .otp-nb {
              font-size: 14px;
            }
    
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                color: #4caf50;
            }
    
            .footer {
                margin-top: 30px;
                font-size: 14px;
                color: #555;
                text-align: left;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h2>Book Share Hub</h2>
            <div class="header">
                <h1>Email Verification</h1>
            </div>
            <div class="otp-content">
                <p>Dear User,</p>
                <p>We have received a request to verify your email address. Please use the following OTP code to complete the verification:</p>
                <p><span class="otp-code">${otp}</span></p>
                <p class="otp-nb">If you didn't request this OTP, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>Best regards,</p>
                <p>Book Share Hub</p>
                <p>&copy; 2023 Book Share Hub All rights reserved.</p>
            </div>
        </div>
    </body>
    
    </html>
    
    `
  );
  console.log("Email sent successfully: ", mailResponse);
};

const passwordChangedMail = async (email) => {
  const mailResponse = await mailSender(
    email,
    "Email Verification",
    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Authentication Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }

            
            h2 {
              font-weight:500;
              color: #6b7280;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            }
    
            .logo {
                display: block;
                margin: 0 auto 20px;
            }
    
            .header {
                background-color: #4caf50;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                text-align: left;
            }
    
            .notification-content {
                margin-top: 30px;
                font-size: 18px;
                color: #333;
                text-align: left;
            }
    
            .footer {
                margin-top: 30px;
                font-size: 14px;
                color: #555;
                text-align: left;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h2>Book Share Hub</h2>
            <div class="header">
              <h1>Email Authentication Notification</h1>
            </div>
            <div class="notification-content">
              <p>Dear User,</p>
              <p>We want to inform you that your password has been changed. If you did not initiate this change, please contact our customer care immediately.</p>
              <p>Thank you for choosing our services.</p>
            </div>
            <div class="footer">
              <p>Best regards,</p>
              <p>Book Share Hub</p>
              <p>&copy; 2023 Book Share Hub All rights reserved.</p>
            </div>
        </div>
    </body>
    
    </html>`
  );
  console.log("Email sent successfully: ", mailResponse);
};

const sendFestivalAnnouncementEmail = async (
  email,
  date,
  time,
  announcementName
) => {
  const mailResponse = await mailSender(
    email,
    "Festival Announcement",
    `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Festival Announcement</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f8fafc;
                  margin: 0;
                  padding: 0;
              }
  
              h2 {
                  font-weight: 500;
                  color: #6b7280;
              }
  
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
              }
  
              .logo {
                  display: block;
                  margin: 0 auto 20px;
              }
  
              .header {
                  background-color: #ff9900;
                  color: #ffffff;
                  padding: 10px 20px;
                  border-radius: 5px;
                  text-align: left;
              }
  
              .announcement-content {
                  margin-top: 30px;
                  font-size: 18px;
                  color: #333;
                  text-align: left;
                  background-color: #fef2e8;
                  border: 1px solid #ffd699;
                  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                  padding: 20px;
                  border-radius: 5px;
              }
  
              .announcement-details {
                  font-size: 16px;
                  font-weight: bold;
                  color: #ff9900;
              }
  
              .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  color: #555;
                  text-align: left;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <h2>Festival Announcement</h2>
              <div class="header">
                  <h1>We're Excited to Announce!</h1>
              </div>
              <div class="announcement-content">
                  <p>Dear Festival Enthusiast,</p>
                  <p>We are thrilled to announce <span class="announcement-details">${announcementName}</span>, an upcoming festival that you wouldn't want to miss!</p>
                  <p>This spectacular event will take place on <span class="announcement-details">${date}</span> at <span class="announcement-details">${time}</span>.</p>
                  <p>Stay tuned for more details and get ready to celebrate!</p>
              </div>
              <div class="footer">
                  <p>Best Regards,</p>
                  <p>The Festival Team</p>
                  <p>&copy; 2024 BookShareHub. All rights reserved.</p>
              </div>
          </div>
      </body>
      
      </html>
      `
  );
  console.log("Email sent successfully: ", mailResponse);
};

module.exports = {
  sendOTPMail,
  passwordChangedMail,
  sendFestivalAnnouncementEmail,
};
