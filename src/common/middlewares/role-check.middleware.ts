import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Import the jwt package

@Injectable()
export class RoleCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing' });
    }

    try {
      // Decode and verify the JWT token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key for verification
      const userRole = decoded?.role;

      if (!userRole) {
        return res.status(403).json({ error: 'Role not found in token' });
      }

      // Attach the role to the request object for further processing
      req['role'] = userRole;

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
}
