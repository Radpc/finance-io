import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControllerType } from 'src/types/response';
import { GetCategoryByIdService } from './get-category-by-id.service';
import { UserGuard } from 'src/modules/jwt/user-jwt/user.guard';

@Controller('categories')
@ApiTags('Category')
export class GetCategoryByIdController extends ControllerType {
  constructor(private readonly getCategory: GetCategoryByIdService) {
    super();
  }

  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Get(':id')
  async handle(@Param('id') id: string) {
    const category = await this.getCategory.execute(+id);

    if (!category) throw new NotFoundException('Category not found');

    return { data: category.toDTO() };
  }
}
