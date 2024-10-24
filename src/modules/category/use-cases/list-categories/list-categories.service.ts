import { Injectable } from '@nestjs/common';
import { CategoryRepoService } from 'src/database/repositories/category/category-repo.service';

type FindAllInput = {
  page: number;
  pageSize: number;
  label?: string;
};

@Injectable()
export class ListCategoriesService {
  constructor(private categoryRepository: CategoryRepoService) {}

  execute(query: FindAllInput) {
    const take = query.pageSize;
    const skip = take * (query.page - 1);
    return this.categoryRepository.categories({
      where: { label: { contains: query.label } },
      skip,
      take,
    });
  }
}
