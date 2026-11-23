import type { Restaurant } from './restuarants.types';
import type { RestaurantRepository } from './restaurants.repository';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';

export class RestaurantsService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  findAll(): Restaurant[] {
    return this.restaurantRepository.all();
  }

  findOpen(): Restaurant[] {
    return this.restaurantRepository
      .all()
      .filter((restaurant) => restaurant.isActive);
  }

  findOne(id: number): Restaurant | undefined {
    return this.restaurantRepository.byId(id);
  }

  create(dto: CreateRestaurantDto): Restaurant {
    const restaurants = this.restaurantRepository.all();

    const nextId =
      restaurants.reduce(
        (highestId, restaurant) => Math.max(highestId, restaurant.id),
        0,
      ) + 1;

    const restaurant: Restaurant = {
      id: nextId,
      name: dto.name,
      address: dto.address,
      ...(dto.phone ? { phone: dto.phone } : {}),
      isActive: true,
    };

    return this.restaurantRepository.create(restaurant);
  }

  remove(id: number): void {
    this.restaurantRepository.remove(id);
  }
}
