import { Injectable } from '@nestjs/common';
import { CategoryRepoService } from 'src/database/repositories/category/category-repo.service';
import { CreateCategoryDTO } from '../../dto/create-category.dto';

@Injectable()
export class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepoService) {}

  execute(createCategoryDto: CreateCategoryDTO) {
    return this.categoryRepository.createCategory({
      label: createCategoryDto.label,
    });
  }
}
