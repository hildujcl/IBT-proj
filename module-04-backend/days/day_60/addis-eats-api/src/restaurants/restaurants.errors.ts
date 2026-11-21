export class RestaurantNotFoundError extends Error {
  constructor(id: number) {
    super(`Restaurant with ID ${id} was not found.`);
    this.name = 'RestaurantNotFoundError';
  }
}
