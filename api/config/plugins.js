module.exports = ({ env }) => ({
  scheduler: {
    enabled: true,
    config: {
      model: 'scheduler',
    },
  },
  email: {
    config: {
      provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'contact@evoketennis.com.au',
        defaultReplyTo: 'contact@evoketennis.com.au',
        testAddress: 'contact@evoketennis.com.au',
      },
    },
  },
});
