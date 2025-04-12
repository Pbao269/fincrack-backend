import { BaseController } from '../common/base.controller';
import { BankRecommendation } from '@prisma/client';
import { BanksService } from './banks.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Body, Post, UseGuards, Controller} from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { BankRecommendationDto, BankRecommendationResponseDto } from './dto';

@Controller('banks')
export class BanksController extends BaseController<BankRecommendation> {
  constructor(private readonly banksService: BanksService) {
    super(banksService);
  }

  @Post('recommendation')
  @UseGuards(JwtAuthGuard)
  async getBankRecommendation(
    @Body() bankRecommendationDto: BankRecommendationDto,
    @GetUser() user: User,
  ): Promise<BankRecommendationResponseDto> {
    return this.banksService.getBankRecommendation(bankRecommendationDto, user.id);
  }
}