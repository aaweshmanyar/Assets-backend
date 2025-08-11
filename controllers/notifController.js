const axios = require('axios');

exports.sendNotification = async (req, res) => {
  const { title, message } = req.body;
  const appId = process.env.ONESIGNAL_APP_ID;
  const restApiKey = process.env.ONESIGNAL_REST_API_KEY;

  try {
    const payload = {
      app_id: appId,
      included_segments: ['All'],
      headings: { en: title || 'Notification' },
      contents: { en: message || 'You have a new notification.' },
    };

    const response = await axios.post('https://onesignal.com/api/v1/notifications', payload, {
      headers: {
        Authorization: `Basic ${restApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ success: true, result: response.data });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
