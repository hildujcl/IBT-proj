import { MenuDish } from './dish.types';

export const DISH_REPOSITORY = 'DISH_REPOSITORY';

export interface DishRepository {
  byId(id: number): MenuDish | undefined;

  all(): MenuDish[];

  create(dish: MenuDish): MenuDish;
}

export class InMemoryDishRepository implements DishRepository {
  private readonly dishes: Map<number, MenuDish>;

  constructor(initialDishes: MenuDish[] = []) {
    this.dishes = new Map<number, MenuDish>();

    for (const dish of initialDishes) {
      this.dishes.set(dish.id, dish);
    }
  }

  byId(id: number): MenuDish | undefined {
    return this.dishes.get(id);
  }

  all(): MenuDish[] {
    return Array.from(this.dishes.values());
  }

  create(dish: MenuDish): MenuDish {
    this.dishes.set(dish.id, dish);
    return dish;
  }
}
