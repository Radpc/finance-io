import { Controller, Get, Query } from '@nestjs/common';

import { ControllerType } from 'src/types/response';
import { ApiTags } from '@nestjs/swagger';
import { ListPaymentsService } from './list-payments.service';
import { GetPaymentsParams } from './list-payments.dto';

@Controller('payments')
@ApiTags('Payment')
export class ListPaymentsController extends ControllerType {
  constructor(private readonly listPaymentsService: ListPaymentsService) {
    super();
  }

  @Get()
  async handle(@Query() query: GetPaymentsParams) {
    const { data, total } = await this.listPaymentsService.execute(query);

    return { data: { payments: data, total }, message: 'Get payments success' };
  }
}
