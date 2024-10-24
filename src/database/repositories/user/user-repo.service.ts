import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { UserDomain } from 'src/modules/user/domain/user.domain';

@Injectable()
export class UserRepoService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDomain | null> {
    const raw = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    return raw ? UserDomain.fromRaw(raw) : null;
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserDomain[]> {
    const { skip, take, cursor, where, orderBy } = params;

    const rawUsers = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return rawUsers.map(UserDomain.fromRaw);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserDomain> {
    const raw = await this.prisma.user.create({
      data,
    });

    return UserDomain.fromRaw(raw);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserDomain> {
    const { where, data } = params;
    const raw = await this.prisma.user.update({
      data,
      where,
    });

    return UserDomain.fromRaw(raw);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserDomain> {
    const raw = await this.prisma.user.delete({
      where,
    });

    return UserDomain.fromRaw(raw);
  }
}
