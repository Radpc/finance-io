import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { CategoryDomain } from 'src/modules/category/domain/category.domain';
import { PaginatedList } from 'src/types/utils';

@Injectable()
export class CategoryRepoService {
  constructor(private prisma: PrismaService) {}

  async getCategory(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryDomain | null> {
    const raw = await this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
    });

    return raw ? CategoryDomain.fromRaw(raw) : null;
  }

  async categories(params: {
    skip: number;
    take: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<PaginatedList<CategoryDomain>> {
    const { skip, take, cursor, where, orderBy } = params;
    const [count, raws] = await this.prisma.$transaction([
      this.prisma.category.count({ where }),
      this.prisma.category.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    ]);

    return {
      data: raws.map(CategoryDomain.fromRaw),
      total: count,
    };
  }

  async createCategory(
    data: Prisma.CategoryCreateInput,
  ): Promise<CategoryDomain> {
    const raw = await this.prisma.category.create({
      data,
    });

    return CategoryDomain.fromRaw(raw);
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<CategoryDomain> {
    const { where, data } = params;
    const raw = await this.prisma.category.update({
      data,
      where,
    });
    return CategoryDomain.fromRaw(raw);
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryDomain> {
    const raw = await this.prisma.category.delete({
      where,
    });
    return CategoryDomain.fromRaw(raw);
  }
}
