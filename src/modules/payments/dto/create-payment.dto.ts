import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentStatus } from '../domain/payment.domain';
import { Transform } from 'class-transformer';

export class CreatePaymentDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'Compras' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 75.8 })
  value: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  categoryId: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'Podemos economizar com isso..' })
  observation?: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.Paid })
  status: PaymentStatus;

  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  @IsArray()
  @ApiProperty({
    type: Number,
    isArray: true,
    example: '[1, 2]',
    required: false,
  })
  tagIds?: number[];
}