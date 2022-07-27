import CustomError from "./customError";

//erro específico not found, que herda do erro customizado, passando o statuscode 404
export default class NotFoundError extends CustomError {
    constructor(message: string, code: number) {
        super(message, code);
    }
}