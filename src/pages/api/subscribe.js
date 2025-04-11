import nodemailer from 'nodemailer';
import { getTopTracks } from '../../lib/spotify';

// Email validation regex
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS/preflight requests immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Reject non-POST methods with proper 405 response
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'Only POST requests are accepted'
    });
  }

  // Validate content type
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(415).json({
      error: 'Unsupported Media Type',
      message: 'Request must be JSON formatted'
    });
  }

  try {
    // Validate request body
    const { email } = req.body;
    
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid Request',
        message: 'A valid email address is required'
      });
    }

    // Get top tracks data
    const topTracks = await getTopTracks();
    if (!topTracks || topTracks.length === 0) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: 'Could not retrieve Spotify data'
      });
    }

    // Prepare email content
    const emailContent = {
      from: `"InsightSync" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎵 Your Weekly Spotify Insights',
      html: `
        <h2>Thanks for Subscribing to InsightSync! 🎉</h2>
        <p>Here are your top tracks this week:</p>
        <ul>
          ${topTracks.map(track => 
            `<li>
              <a href="${track.url}" target="_blank">${track.name}</a> — ${track.artist}
            </li>`
          ).join('')}
        </ul>
        <p>Check out your personalized dashboard for more insights: <a href="${process.env.NEXT_PUBLIC_URL}/dashboard?email=${encodeURIComponent(email)}">View Dashboard</a></p>
        <p>Look forward to more insights next week! 🚀</p>
      `
    };

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add these for better error handling
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5
    });

    // Send email
    await transporter.sendMail(emailContent);
    
    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Subscription confirmed! Check your email for insights.'
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // Determine appropriate status code
    const statusCode = error.response?.status || 
                      error.code === 'EAUTH' ? 401 : 
                      500;

    return res.status(statusCode).json({
      error: 'Subscription Failed',
      message: 'Could not process your request',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
        stack: error.stack
      })
    });
  }
}