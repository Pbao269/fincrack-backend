import { IsInt, IsOptional, IsPositive, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Base pagination DTO with common pagination parameters
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  take?: number;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  orderDirection?: 'asc' | 'desc';
}

/**
 * Base ID parameter DTO for route parameters
 */
export class IdParamDto {
  @IsString()
  id: string;
}
