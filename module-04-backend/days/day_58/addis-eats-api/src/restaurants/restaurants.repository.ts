import type { Restaurant } from './restuarants.types';

export const RESTAURANT_REPOSITORY = 'RESTAURANT_REPOSITORY';

export interface RestaurantRepository {
  byId(id: number): Restaurant | undefined;
  all(): Restaurant[];
  create(restaurant: Restaurant): Restaurant;
  remove(id: number): boolean;
}

export class InMemoryRestaurantRepository implements RestaurantRepository {
  private readonly restaurants: Map<number, Restaurant>;

  constructor(initialRestaurants: Restaurant[] = []) {
    this.restaurants = new Map<number, Restaurant>();

    for (const restaurant of initialRestaurants) {
      this.restaurants.set(restaurant.id, restaurant);
    }
  }

  byId(id: number): Restaurant | undefined {
    return this.restaurants.get(id);
  }

  all(): Restaurant[] {
    return Array.from(this.restaurants.values());
  }

  create(restaurant: Restaurant): Restaurant {
    this.restaurants.set(restaurant.id, restaurant);
    return restaurant;
  }

  remove(id: number): boolean {
    return this.restaurants.delete(id);
  }
}
