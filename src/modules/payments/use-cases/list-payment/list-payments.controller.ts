import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ControllerType } from 'src/types/response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListPaymentsService } from './list-payments.service';
import { GetPaymentsParams } from './list-payments.dto';
import { UserGuard } from 'src/modules/jwt/user-jwt/user.guard';

@Controller('payments')
@ApiTags('Payment')
export class ListPaymentsController extends ControllerType {
  constructor(private readonly listPaymentsService: ListPaymentsService) {
    super();
  }

  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Get()
  async handle(@Query() query: GetPaymentsParams) {
    const { data, total } = await this.listPaymentsService.execute(query);

    return { data: { payments: data, total }, message: 'Get payments success' };
  }
}
