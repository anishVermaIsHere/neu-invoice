

const AppConfig = {
    appName: process.env.NEXT_PUBLIC_APP_NAME!,
    oAuth: {
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!
    },
    mailer: {
        user: process.env.EMAIL_SERVER_USER!,
        password: process.env.EMAIL_SERVER_PASSWORD!,
        host: process.env.EMAIL_SERVER_HOST!,
        port: process.env.EMAIL_SERVER_PORT!,
        email: process.env.EMAIL_FROM!
    },
    mailTrap: {
        token: process.env.MAILTRAP_TOKEN!
    },
    dbUrl: process.env.DATABASE_URL!,
    authSecret: process.env.AUTH_SECRET!
};

export default AppConfig;
