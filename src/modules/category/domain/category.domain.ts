import { Category } from '@prisma/client';
import { CategoryDTO } from '../dto/category.dto';

interface IProps {
  id: number;
  label: string;
}

export class CategoryDomain {
  id: number;
  label: string;

  constructor(props: IProps) {
    this.id = props.id;
    this.label = props.label;
  }

  static fromRaw(category: Category) {
    return new CategoryDomain({ id: category.id, label: category.label });
  }

  toDTO() {
    return new CategoryDTO({ id: this.id, label: this.label });
  }
}
