import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { PaymentDomain } from 'src/modules/payments/domain/payment.domain';
import { PaginatedList } from 'src/types/utils';

@Injectable()
export class PaymentRepoService {
  constructor(private prisma: PrismaService) {}

  async getPayment(
    paymentWhereUniqueInput: Prisma.PaymentWhereUniqueInput,
  ): Promise<PaymentDomain | null> {
    const raw = await this.prisma.payment.findUnique({
      where: paymentWhereUniqueInput,
    });

    return raw ? PaymentDomain.fromRaw(raw) : null;
  }

  async getPayments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PaymentWhereUniqueInput;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput;
  }): Promise<PaginatedList<PaymentDomain>> {
    const { skip, take, cursor, where, orderBy } = params;

    const query = {
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { category: true, tags: true, _count: true },
    } satisfies Prisma.PaymentFindManyArgs;

    const [raws, count] = await this.prisma.$transaction([
      this.prisma.payment.findMany(query),
      this.prisma.payment.count({ where: query.where }),
    ]);

    return { data: raws.map(PaymentDomain.fromRaw), total: count };
  }

  async createPayment(data: Prisma.PaymentCreateInput): Promise<PaymentDomain> {
    const raw = await this.prisma.payment.create({
      data,
    });

    return PaymentDomain.fromRaw(raw);
  }

  async updatePayment(params: {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.PaymentUpdateInput;
  }): Promise<PaymentDomain> {
    const { where, data } = params;

    const raw = await this.prisma.payment.update({
      data,
      where,
    });
    return PaymentDomain.fromRaw(raw);
  }

  async deletePayment(
    where: Prisma.PaymentWhereUniqueInput,
  ): Promise<PaymentDomain> {
    const raw = await this.prisma.payment.delete({
      where,
    });

    return PaymentDomain.fromRaw(raw);
  }
}
