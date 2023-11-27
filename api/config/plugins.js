module.exports = ({ env }) => ({
  scheduler: {
    enabled: true,
    config: {
      model: 'scheduler',
    },
  },
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: 'smtp.gmail.com', //SMTP Host
        port: 465   , //SMTP Port
        secure: true,
        username: '***@gmail.com',
        password: '*****',
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
    },
    settings: {
      defaultFrom: 'roy.ethienne@gmail.com',
      defaultReplyTo: 'roy.ethienne@gmail.com',
    }, 
  },    
});
