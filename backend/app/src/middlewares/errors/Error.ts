import CustomError from "./customError";

export default class Error extends CustomError {
    constructor(message: string, code: number) {
        super(message, code);
    }
}