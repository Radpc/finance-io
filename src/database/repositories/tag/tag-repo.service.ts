import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { TagDomain } from 'src/modules/tags/domain/tag.domain';

type PaginatedList<T> = {
  data: T[];
  total: number;
};

@Injectable()
export class TagRepoService {
  constructor(private prisma: PrismaService) {}

  async getTag(
    tagWhereUniqueInput: Prisma.TagWhereUniqueInput,
  ): Promise<TagDomain | null> {
    const raw = await this.prisma.tag.findUnique({
      where: tagWhereUniqueInput,
    });

    return raw ? TagDomain.fromRaw(raw) : null;
  }

  async getTags(params: {
    skip: number;
    take: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
  }): Promise<PaginatedList<TagDomain>> {
    const { skip, take, cursor, where, orderBy } = params;
    const [count, raws] = await this.prisma.$transaction([
      this.prisma.tag.count({ where }),
      this.prisma.tag.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    ]);

    return {
      data: raws.map(TagDomain.fromRaw),
      total: count,
    };
  }

  async createTag(data: Prisma.TagCreateInput): Promise<TagDomain> {
    const raw = await this.prisma.tag.create({
      data,
    });

    return TagDomain.fromRaw(raw);
  }

  async updateTag(params: {
    where: Prisma.TagWhereUniqueInput;
    data: Prisma.TagUpdateInput;
  }): Promise<TagDomain> {
    const { where, data } = params;
    const raw = await this.prisma.tag.update({
      data,
      where,
    });
    return TagDomain.fromRaw(raw);
  }

  async deleteTag(where: Prisma.TagWhereUniqueInput): Promise<TagDomain> {
    const raw = await this.prisma.tag.delete({
      where,
    });
    return TagDomain.fromRaw(raw);
  }
}
