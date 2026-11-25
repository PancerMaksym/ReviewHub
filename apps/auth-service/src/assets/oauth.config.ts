import { OAuthProvidersEnum } from '@review-hub/enums'

export const OAUTH_PROVIDERS = {
  [OAuthProvidersEnum.GOOGLE]: {
    clientId: process.env.GOOGLE_ID,
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://openidconnect.googleapis.com/v1/userinfo',
    scopes: ['openid', 'email', 'profile'],
  },

  [OAuthProvidersEnum.GITHUB]: {
    clientId: process.env.GITHUB_ID,
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user',
    scopes: ['read:user', 'user:email'],
  }
} as const;
