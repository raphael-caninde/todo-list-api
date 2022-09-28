import CustomError from "./customError";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
};

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
};

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
};
