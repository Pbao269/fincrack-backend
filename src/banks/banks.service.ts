import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { BankRecommendation } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { BankRecommendationDto, BankRecommendationResponseDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BanksService extends BaseService<BankRecommendation> {
  protected readonly modelName = 'bankRecommendation';
  
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    super(prisma);
  }

  async getBankRecommendation(bankRecommendationDto: BankRecommendationDto, userId: string): Promise<BankRecommendationResponseDto> {
    try {
      // 1. Call external AI model API
      const aiModelUrl = this.configService.get('AI_MODEL_URL') || 'http://localhost:8000/predict';
      
      const response = await firstValueFrom(
        this.httpService.post<{ recommended_bank: string }>(aiModelUrl, bankRecommendationDto)
      );
      
      const recommendedBank = response.data.recommended_bank;
      
      // 2. Store both input and output in database
      await this.create({
        userId,
        // Map DTO fields to database model fields
        digitalInterfaceRank: bankRecommendationDto['Digital Interface Rank'],
        numberOfBranches: bankRecommendationDto['Number of Branches'],
        greenInitiativesRank: bankRecommendationDto['Green Initiatives Rank'],
        feeLevelRank: bankRecommendationDto['Fee Level Rank'],
        internationalSupportRank: bankRecommendationDto['International Support Rank'],
        interestRateRangeRank: bankRecommendationDto['Interest Rate Range Rank'],
        customerServiceQualityRank: bankRecommendationDto['Customer Service Quality Rank'],
        capitalAdequacyRank: bankRecommendationDto['Capital Adequacy Rank'],
        
        // Banking services
        autoLoans: bankRecommendationDto['Auto Loans'],
        creditCards: bankRecommendationDto['Credit Cards'],
        globalBanking: bankRecommendationDto['Global Banking'],
        investments: bankRecommendationDto['Investments'],
        loans: bankRecommendationDto['Loans'],
        mortgages: bankRecommendationDto['Mortgages'],
        savingsAccounts: bankRecommendationDto['Savings Accounts'],
        
        // Customer segments
        globalCustomers: bankRecommendationDto['Global Customers'],
        professionals: bankRecommendationDto['Professionals'],
        smes: bankRecommendationDto['SMEs'],
        seniors: bankRecommendationDto['Seniors'],
        students: bankRecommendationDto['Students'],
        techSavvy: bankRecommendationDto['Tech-Savvy'],
        
        // Output result
        recommendedBank
      });
      
      // 3. Return the response
      return { recommended_bank: recommendedBank };
      
    } catch (error) {
      // Handle API call errors and other exceptions
      console.error('Error in bank recommendation:', error.message);
      throw new Error(`Failed to get bank recommendation: ${error.message}`);
    }
  }
}
