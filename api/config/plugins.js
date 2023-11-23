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
        username: 'roy.ethienne@gmail.com',
        password: 'Cobalt12345',
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
