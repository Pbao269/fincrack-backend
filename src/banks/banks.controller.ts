import { BaseController } from '@/common';
import { BankRecommendation } from '@prisma/client';
import { BanksService } from './banks.service';
import { JwtAuthGuard } from '@/auth/guard';
import { Body, Post, UseGuards, Controller} from '@nestjs/common';
import { GetUser } from '@/auth/decorator';
import { User } from '@prisma/client';
import { BankRecommendationDto, BankRecommendationResponseDto } from './dto';

@Controller('banks')
@UseGuards(JwtAuthGuard)
export class BanksController extends BaseController<BankRecommendation> {
  constructor(private readonly banksService: BanksService) {
    super(banksService);
  }

  @Post('recommendation')
  async getBankRecommendation(
    @Body() bankRecommendationDto: BankRecommendationDto,
    @GetUser() user: User,
  ): Promise<BankRecommendationResponseDto> {
    console.log(`[${new Date().toISOString()}] Bank recommendation route triggered - User ID: ${user.id}, Email: ${user.email}`);
    return this.banksService.getBankRecommendation(bankRecommendationDto, user.id);
  }
}