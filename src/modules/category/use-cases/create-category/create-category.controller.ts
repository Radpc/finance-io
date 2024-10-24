import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from '../../dto/create-category.dto';
import { ControllerType } from 'src/types/response';
import { CreateCategoryService } from './create-category.service';
import { UserGuard } from 'src/modules/jwt/user-jwt/user.guard';

@Controller('categories')
@ApiTags('Category')
export class CreateCategoryController extends ControllerType {
  constructor(private readonly createCategory: CreateCategoryService) {
    super();
  }

  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Post()
  async handle(@Body() createCategoryDto: CreateCategoryDTO) {
    const res = await this.createCategory.execute(createCategoryDto);
    return { data: res, message: 'Category created' };
  }
}
