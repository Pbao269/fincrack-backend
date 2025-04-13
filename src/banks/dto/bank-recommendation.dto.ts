import { IsBoolean, IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class BankRecommendationDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  'Digital Interface Rank': number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  'Number of Branches': number;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  'Green Initiatives Rank': number;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  'Fee Level Rank': number;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  'International Support Rank': number;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  'Interest Rate Range Rank': number;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  'Customer Service Quality Rank': number;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  'Capital Adequacy Rank': number;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Auto Loans': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Credit Cards': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Global Banking': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Investments': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Loans': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Mortgages': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Savings Accounts': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Global Customers': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Professionals': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'SMEs': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Seniors': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Students': boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 1 || value === '1' || value === true)
  'Tech-Savvy': boolean;
}

export class BankRecommendationResponseDto {
  recommended_bank: string;
  description?: string;
  website?: string;
} 