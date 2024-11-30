import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      /**
       * Optional user object attached to the request, typically set after authentication.
       */
      user?: {
        _id: string;
        email: string;
      };
    }
  }
}
