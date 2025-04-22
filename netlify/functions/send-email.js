const emailjs = require('@emailjs/nodejs');
  
exports.handler = async (event) => {
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
  const EMAILJS_PRIVATE_KEY = process.env.REACT_APP_EMAILJS_PRIVATE_KEY
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  const SECRET_KEY = process.env.REACT_APP_RECAPTCHA_SECRET_KEY

  try {
    const { formData, recaptchaToken } = JSON.parse(event.body);
    
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaToken}`
    );
    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: recaptchaResult['error-codes']?.includes('timeout-or-duplicate') 
            ? 'TOKEN_EXPIRED' 
            : 'RECAPTCHA_FAILED'
        })
      };
    }

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formData, {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error })
    };
  }
};