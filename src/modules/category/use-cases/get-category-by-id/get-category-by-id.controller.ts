import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerType } from 'src/types/response';
import { GetCategoryByIdService } from './get-category-by-id.service';

@Controller('categories')
@ApiTags('Category')
export class GetCategoryByIdController extends ControllerType {
  constructor(private readonly getCategory: GetCategoryByIdService) {
    super();
  }

  @Get(':id')
  async handle(@Param('id') id: string) {
    const category = await this.getCategory.execute(+id);

    if (!category) throw new NotFoundException('Category not found');

    return { data: category.toDTO() };
  }
}
