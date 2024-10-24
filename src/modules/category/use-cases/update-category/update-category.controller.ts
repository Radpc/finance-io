import { Controller, Body, Patch, Param } from '@nestjs/common';
import { UpdateCategoryService } from './update-category.service';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Category')
export class UpdateCategoryController {
  constructor(private readonly categoriesService: UpdateCategoryService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.execute(+id, updateCategoryDto);
  }
}
