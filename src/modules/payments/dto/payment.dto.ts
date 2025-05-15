import { CategoryDTO } from 'src/modules/category/dto/category.dto';
import { PaymentMethod, PaymentStatus } from '../domain/payment.domain';
import { TagDTO } from 'src/modules/tags/dto/tag.dto';

interface IProps {
  id: number;
  description: string;
  value: number;
  observation?: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;

  category?: CategoryDTO;
  tags?: TagDTO[];
}

export class PaymentDTO {
  id: number;
  description: string;
  value: number;
  observation?: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;

  category?: CategoryDTO;
  tags?: TagDTO[];

  constructor(props: IProps) {
    this.id = props.id;
    this.description = props.description;
    this.value = props.value;
    this.observation = props.observation;
    this.status = props.status;
    this.paymentMethod = props.paymentMethod;
    this.paymentDate = props.paymentDate;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    this.category = props.category;
    this.tags = props.tags;
  }
}
