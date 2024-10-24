import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerType } from 'src/types/response';
import { CreatePaymentService } from './create-payment.service';
import { CreatePaymentDTO } from '../../dto/create-payment.dto';

@Controller('payments')
@ApiTags('Payment')
export class CreatePaymentController extends ControllerType {
  constructor(private readonly createPaymentService: CreatePaymentService) {
    super();
  }

  @Post()
  async handle(@Body() createPaymentDto: CreatePaymentDTO) {
    const res = await this.createPaymentService.execute(createPaymentDto);
    return { data: res, message: 'Payment created' };
  }
}
