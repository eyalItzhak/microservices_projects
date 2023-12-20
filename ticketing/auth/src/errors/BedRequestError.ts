import { CustomError } from "./custom-error";

export class BedRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    //because ts
    Object.setPrototypeOf(this, BedRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
