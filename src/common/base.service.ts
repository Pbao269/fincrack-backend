/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export abstract class BaseService<T> {
  protected abstract readonly modelName: string;

  constructor(protected readonly prisma: PrismaService) {}

  /**
   * Find a single record by ID
   */
  async findById(id: string): Promise<T> {
    const record = await (this.prisma[this.modelName] as any).findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }

    return record;
  }

  /**
   * Find a single record by a custom where clause
   */
  async findOne(where: Prisma.Args<any, 'findUnique'>['where']): Promise<T> {
    const record = await (this.prisma[this.modelName] as any).findUnique({
      where,
    });

    if (!record) {
      throw new NotFoundException(`${this.modelName} not found`);
    }

    return record;
  }

  /**
   * Find multiple records with pagination, sorting, and filtering
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.Args<any, 'findMany'>['where'];
    orderBy?: Prisma.Args<any, 'findMany'>['orderBy'];
  }): Promise<T[]> {
    const { skip, take, where, orderBy } = params;
    return (this.prisma[this.modelName] as any).findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /**
   * Count records based on a filter
   */
  async count(where?: Prisma.Args<any, 'count'>['where']): Promise<number> {
    return (this.prisma[this.modelName] as any).count({
      where,
    });
  }

  /**
   * Create a new record
   */
  async create(data: Prisma.Args<any, 'create'>['data']): Promise<T> {
    return (this.prisma[this.modelName] as any).create({
      data,
    });
  }

  /**
   * Update a record by ID
   */
  async update(
    id: string,
    data: Prisma.Args<any, 'update'>['data'],
  ): Promise<T> {
    try {
      return await (this.prisma[this.modelName] as any).update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `${this.modelName} with ID ${id} not found`,
        );
      }
      throw error;
    }
  }

  /**
   * Delete a record by ID
   */
  async delete(id: string): Promise<T> {
    try {
      return await (this.prisma[this.modelName] as any).delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `${this.modelName} with ID ${id} not found`,
        );
      }
      throw error;
    }
  }

  /**
   * Upsert (create or update) a record
   */
  async upsert(
    where: Prisma.Args<any, 'upsert'>['where'],
    create: Prisma.Args<any, 'upsert'>['create'],
    update: Prisma.Args<any, 'upsert'>['update'],
  ): Promise<T> {
    return (this.prisma[this.modelName] as any).upsert({
      where,
      create,
      update,
    });
  }

  /**
   * Transaction support
   */
  async transaction<R>(
    fn: (
      tx: Omit<
        PrismaService,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
      >,
    ) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction(fn);
  }
}
