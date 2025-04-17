/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { BaseService, StringArrayMap } from '@/common';
import { BankRecommendation } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { BankRecommendationDto, BankRecommendationResponseDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BanksService extends BaseService<BankRecommendation> {
  protected readonly modelName = 'bankRecommendation';

  // Define the bank information map
  private readonly bankInfoMap: StringArrayMap = new StringArrayMap([
    [
      'Chase',
      [
        'A leading global financial institution, Chase offers a wide range of services such as personal banking, credit cards, and investment products. It is known for its extensive branch network, innovative digital banking tools, and strong presence in both consumer and commercial banking sectors.',
        'https://www.chase.com/',
      ],
    ],
    [
      'Bank of America',
      [
        'One of the largest banks in the United States, Bank of America provides comprehensive financial services including checking and savings accounts, credit cards, mortgages, and investment products. It has a significant national footprint and invests heavily in digital banking technology to enhance customer experience.',
        'https://www.bankofamerica.com/',
      ],
    ],
    [
      'Wells Fargo',
      [
        'With a long history in American banking, Wells Fargo offers diverse services like retail banking, small business financing, mortgages, and wealth management. It is recognized for its wide branch network and commitment to community banking, despite undergoing reforms and modernization efforts over recent years.',
        'https://www.wellsfargo.com/',
      ],
    ],
    [
      'Capital One',
      [
        'Capital One is known for its emphasis on credit and consumer lending, particularly in credit cards and auto loans. It leverages a technology-driven approach to deliver innovative banking services, focusing on a seamless digital experience along with its evolving physical branch presence.',
        'https://www.capitalone.com/',
      ],
    ],
    [
      'Citibank',
      [
        'As the consumer division of Citigroup, Citibank offers global financial products and services, from everyday banking to investment and wealth management services. Its international reach and commitment to serving a diverse customer base distinguish it as a key player in global finance.',
        'https://www.citi.com/',
      ],
    ],
  ]);

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super(prisma);
  }

  async getBankRecommendation(
    bankRecommendationDto: BankRecommendationDto,
    userId: string,
  ): Promise<BankRecommendationResponseDto> {
    try {
      // Get the current environment
      const nodeEnv = this.configService.get('NODE_ENV') || 'development';

      // Select the appropriate URL based on environment
      let aiModelUrl: string;
      if (nodeEnv === 'production') {
        aiModelUrl =
          this.configService.get('BANK_RECOMMENDATION_PROD_URL') || '';
      } else {
        aiModelUrl =
          this.configService.get('BANK_RECOMMENDATION_DEV_URL') || '';
      }

      // Fallback to legacy URL if neither environment-specific URL is available
      if (!aiModelUrl) {
        aiModelUrl =
          this.configService.get('AI_MODEL_URL') ||
          'http://localhost:8000/predict';
      }

      // Log which URL we're using
      console.log(
        `Using bank recommendation URL for ${nodeEnv} environment: ${aiModelUrl}`,
      );

      const response = await firstValueFrom(
        this.httpService.post<{ recommended_bank: string }>(
          aiModelUrl,
          bankRecommendationDto,
        ),
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
        internationalSupportRank:
          bankRecommendationDto['International Support Rank'],
        interestRateRangeRank:
          bankRecommendationDto['Interest Rate Range Rank'],
        customerServiceQualityRank:
          bankRecommendationDto['Customer Service Quality Rank'],
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
        recommendedBank,
      });

      // 3. Retrieve additional info from map
      const bankInfo = this.bankInfoMap.get(recommendedBank);
      const description = bankInfo?.[0];
      const website = bankInfo?.[1];

      // 4. Return the combined response
      return {
        recommended_bank: recommendedBank,
        description: description,
        website: website,
      };
    } catch (error) {
      // Handle API call errors and other exceptions
      console.error('Error in bank recommendation:', error.message);
      throw new Error(`Failed to get bank recommendation: ${error.message}`);
    }
  }
}
