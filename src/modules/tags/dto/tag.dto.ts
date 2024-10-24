interface IProps {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export class TagDTO {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string;

  constructor(props: IProps) {
    this.id = props.id;
    this.label = props.label;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
