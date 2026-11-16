export class RestaurantReferenceError extends Error {
  constructor(restaurantId: number) {
    super(`Restaurant with ID ${restaurantId} does not exist.`);
    this.name = 'RestaurantReferenceError';
  }
}
