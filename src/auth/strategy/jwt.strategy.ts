import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

// User data without hash
type SafeUser = Omit<User, 'hash'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const jwtSecret = config.get('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret as string,
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<SafeUser | null> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
        include: {
          bankRecommendations: true,
        },
      });
      
    if (!user) {
      return null;
    }
    
    // Remove the hash property
    const { hash, ...result } = user;
    return result;
  }
}