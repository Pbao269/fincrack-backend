import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseService } from '@/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService extends BaseService<User> {
  protected readonly modelName = 'user';

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * Update the current user's profile
   */
  async updateMe(userId: string, dto: { firstName?: string; lastName?: string }): Promise<User> {
    return this.update(userId, dto);
  }
}
