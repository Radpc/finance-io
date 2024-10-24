import { Module } from '@nestjs/common';
import { CategoryRepoService } from 'src/database/repositories/category/category-repo.service';
import { PrismaModule } from 'src/database/prisma.module';
import { CreateCategoryController } from './use-cases/create-category/create-category.controller';
import { CreateCategoryService } from './use-cases/create-category/create-category.service';
import { GetCategoryByIdController } from './use-cases/get-category-by-id/get-category-by-id.controller';
import { GetCategoryByIdService } from './use-cases/get-category-by-id/get-category-by-id.service';
import { ListCategoriesController } from './use-cases/list-categories/list-categories.controller';
import { UpdateCategoryController } from './use-cases/update-category/update-category.controller';
import { ListCategoriesService } from './use-cases/list-categories/list-categories.service';
import { UpdateCategoryService } from './use-cases/update-category/update-category.service';

@Module({
  controllers: [
    CreateCategoryController,
    GetCategoryByIdController,
    ListCategoriesController,
    UpdateCategoryController,
  ],
  imports: [PrismaModule],
  providers: [
    CategoryRepoService,
    CreateCategoryService,
    GetCategoryByIdService,
    ListCategoriesService,
    UpdateCategoryService,
  ],
})
export class CategoriesModule {}
