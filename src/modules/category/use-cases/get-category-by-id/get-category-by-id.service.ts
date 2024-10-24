import { Injectable } from '@nestjs/common';
import { CategoryRepoService } from 'src/database/repositories/category/category-repo.service';

@Injectable()
export class GetCategoryByIdService {
  constructor(private categoryRepository: CategoryRepoService) {}

  execute(categoryId: number) {
    return this.categoryRepository.getCategory({ id: categoryId });
  }
}
