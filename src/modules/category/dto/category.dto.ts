interface IProps {
  id: number;
  label: string;
}

export class CategoryDTO {
  id: number;
  label: string;

  constructor(props: IProps) {
    this.id = props.id;
    this.label = props.label;
  }
}
