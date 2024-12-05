const crypto = require('crypto');

// Middleware to handle Facebook data deletion callback
app.post('/auth/data-deletion', (req, res) => {
  const signedRequest = req.body.signed_request;
  const [encodedSignature, payload] = signedRequest.split('.');

  const secret = process.env.FACEBOOK_CLIENT_SECRET; // Your app secret
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  if (encodedSignature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  if (data.user_id) {
    // Perform data deletion here (e.g., delete user from database)
    console.log(`Delete data for user ID: ${data.user_id}`);
  }

  // Respond with confirmation
  res.json({
    url: 'http://localhost:3000/data-deletion-confirmation',
    confirmation_code: data.user_id, // 
  });
});
