import { JwksClient } from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const client = new JwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (error, key) {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export async function isTokenValid(token: string) {
  if (token) {
    const bearerToken = token.split(' ');
    const result = new Promise((resolve, reject) => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `https://${AUTH0_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        (error, decoded) => {
          if (error) {
            resolve({ error });
          }
          if (decoded) {
            resolve({ decoded });
          }
        },
      );
    });

    return result;
  }

  return { error: 'No token provided' };
}
import { expressjwt } from 'express-jwt';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
export const checkJwt = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  requestProperty: 'token',
  credentialsRequired: false,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});
