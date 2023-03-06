const NODE_ENV = process.env.NODE_ENV || 'local';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/vconnect';
const JWT_SHARED_KEY =
  process.env.JWT_SHARED_KEY ||
  '70337336763979244226452948404D635166546A576E5A7134743777217A25432A462D4A614E645267556B58703273357538782F413F4428472B4B6250655368';

const FB_APP_ID = process.env.FB_APP_ID || '1067192480465819';
const FB_APP_SECRET = process.env.FB_APP_SECRET || '';

const LN_APP_ID = process.env.LN_APP_ID || '779zvhm4srbatp';
const LN_APP_SECRET = process.env.LN_APP_SECRET || '';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT || 465;
const SMTP_SECURE = process.env.SMTP_SECURE || true;
const SMTP_USERNAME =
  process.env.SMTP_USERNAME || 'devtestexperiment2020@gmail.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || 'cCK9zTdFzb';

const EMAIL_FROM = process.env.EMAIL_FROM || 'devtestexperiment2020@gmail.com';
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'VConnect – Platform';

const COMPANY_EMAIL_DOMAIN = process.env.COMPANY_EMAIL_DOMAIN || 'vulkan.com';

const APPLE_APP_ID = process.env.APPLE_APP_ID || 'com.vulkan.vconnect';
const APPLE_APP_SECRET = process.env.APPLE_APP_SECRET || '669D5WPNT8';
const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID || 'WTBN98QD3K';
const APPLE_PRIVATE_KEY =
  process.env.APPLE_PRIVATE_KEY ||
  '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgQoh5lZWChj2H97j8\ntAvgOQHpuKMlirosZa9lJlbrjKygCgYIKoZIzj0DAQehRANCAAROTjyhA5s+q7e9\nIGuX79c0ix+sg39L90Yp3vXrRS9eUyj9s7YG8MRyuhSJwCK3g3VpFgvsT49EuE1o\n477zcmlj\n-----END PRIVATE KEY-----';

export default {
  NODE_ENV,

  MONGODB_URI,
  JWT_SHARED_KEY,

  FB_APP_ID,
  FB_APP_SECRET,

  LN_APP_ID,
  LN_APP_SECRET,

  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USERNAME,
  SMTP_PASSWORD,

  EMAIL_FROM,
  EMAIL_FROM_NAME,

  COMPANY_EMAIL_DOMAIN,

  APPLE_APP_ID,
  APPLE_APP_SECRET,
  APPLE_TEAM_ID,
  APPLE_PRIVATE_KEY,
};
