export class OrderNotFoundError extends Error {
  constructor(public readonly id: number) {
    super(`Order with ID ${id} was not found.`);
    this.name = 'OrderNotFoundError';
  }
}

export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`Payment declined for ${phone}: ${reason}`);
    this.name = 'PaymentDeclinedError';
  }
}

export class InvalidOrderTransitionError extends Error {
  constructor(
    public readonly currentStatus: string,
    public readonly nextStatus: string,
  ) {
    super(`Cannot change order status from ${currentStatus} to ${nextStatus}.`);
    this.name = 'InvalidOrderTransitionError';
  }
}
