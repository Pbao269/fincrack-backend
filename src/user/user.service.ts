import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service'; // Changed from '@/common' or similar alias

@Injectable()
export class UserService extends BaseService<User> {
  protected readonly modelName = 'user';

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * Update the current user's profile
   */
  async updateMe(
    userId: string,
    dto: { firstName?: string; lastName?: string },
  ): Promise<User> {
    return this.update(userId, dto);
  }
}
