import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from '../../dto/create-category.dto';
import { ControllerType } from 'src/types/response';
import { CreateCategoryService } from './create-category.service';

@Controller('categories')
@ApiTags('Category')
export class CreateCategoryController extends ControllerType {
  constructor(private readonly createCategory: CreateCategoryService) {
    super();
  }

  @Post()
  async handle(@Body() createCategoryDto: CreateCategoryDTO) {
    const res = await this.createCategory.execute(createCategoryDto);
    return { data: res, message: 'Category created' };
  }
}
