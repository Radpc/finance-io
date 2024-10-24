import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControllerType } from 'src/types/response';
import { CreatePaymentService } from './create-payment.service';
import { CreatePaymentDTO } from '../../dto/create-payment.dto';
import { UserGuard, UserRequest } from 'src/modules/jwt/user-jwt/user.guard';

@Controller('payments')
@ApiTags('Payment')
export class CreatePaymentController extends ControllerType {
  constructor(private readonly createPaymentService: CreatePaymentService) {
    super();
  }

  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Post()
  async handle(
    @Req() request: UserRequest,
    @Body() createPaymentDto: CreatePaymentDTO,
  ) {
    const requesterId = request.jwtPayload.userId;
    const res = await this.createPaymentService.execute(
      createPaymentDto,
      requesterId,
    );
    return { data: res, message: 'Payment created' };
  }
}
