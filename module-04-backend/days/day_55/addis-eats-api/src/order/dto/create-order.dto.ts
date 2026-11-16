import { Area } from '../order.types';

export class CreateOrderDto {
  customer!: string;
  area!: Area;
  totalSantim!: number;
  teleBirrPhone?: string;
}
