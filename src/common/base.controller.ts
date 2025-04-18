/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseService } from './base.service';
import { IdParamDto, PaginationDto } from './base.dto';

export abstract class BaseController<T> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get()
  async findAll(@Query() query: PaginationDto) {
    const { skip, take, orderBy, orderDirection } = query;

    let orderByObj: Record<string, 'asc' | 'desc'> | undefined = undefined;
    if (orderBy) {
      orderByObj = {
        [orderBy]: orderDirection || 'asc',
      };
    }

    const [data, count] = await Promise.all([
      this.baseService.findMany({
        skip,
        take,
        orderBy: orderByObj as any, // Type cast to avoid complex typing
      }),
      this.baseService.count(),
    ]);

    return {
      data,
      meta: {
        count,
        skip: skip || 0,
        take: take || count,
      },
    };
  }

  @Get(':id')
  async findOne(@Param() params: IdParamDto) {
    return this.baseService.findById(params.id);
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.baseService.create(createDto);
  }

  @Put(':id')
  async update(@Param() params: IdParamDto, @Body() updateDto: any) {
    return this.baseService.update(params.id, updateDto);
  }

  @Delete(':id')
  async remove(@Param() params: IdParamDto) {
    return this.baseService.delete(params.id);
  }
}
