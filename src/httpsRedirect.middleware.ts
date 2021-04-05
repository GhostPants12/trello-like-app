import { HttpStatus, Injectable, NestMiddleware, Type } from '@nestjs/common';

export function HttpsRedirectMiddleware(): Type<NestMiddleware> {
  @Injectable()
  class HttpsRedirectMiddlewareCtor implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
      if (!req.secure) {
        let redirectUrl;
        if(req.hostname === 'localhost'){
            redirectUrl = `https://${req.hostname}:${process.env.PORT}${req.originalUrl}`;
        }
        else { 
            redirectUrl = `https://${req.hostname}${req.originalUrl}`;
        }

        res.redirect(HttpStatus.PERMANENT_REDIRECT, redirectUrl);
      } else {
        next();
      }
    }
  }
  return HttpsRedirectMiddlewareCtor;
}