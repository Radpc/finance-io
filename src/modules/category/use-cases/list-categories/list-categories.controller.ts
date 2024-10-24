import { Controller, Get, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ListCategoriesService } from './list-categories.service';
import { ControllerType } from 'src/types/response';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class GetCategoriesParams {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ type: Number, example: 1, required: true })
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ type: Number, example: 1, required: true })
  pageSize: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, example: 'Exemplo', required: false })
  label?: string;
}

@Controller('categories')
@ApiTags('Category')
export class ListCategoriesController extends ControllerType {
  constructor(private readonly listCategoriesService: ListCategoriesService) {
    super();
  }

  @Get()
  async handle(@Query() query: GetCategoriesParams) {
    return this.listCategoriesService.execute({
      page: query.page,
      pageSize: query.pageSize,
      label: query.label,
    });
  }
}
