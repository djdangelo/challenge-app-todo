import { ApiStatusCode } from './ApiStatusCode';

export class DynamicResponseMessage<T> {
    public success: boolean;
    public message: string | null;
    public status: ApiStatusCode;
    public data?: T;
    public errors?: string[];

    constructor(
        success: boolean,
        message: string | null,
        status: ApiStatusCode,
        data?: T,
        errors?: string[]
    ) {
        this.success = success;
        this.message = message;
        this.status = status;
        this.data = data;
        this.errors = errors;
    }

    public static Ok<T>(data: T, message: string = 'Success'): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(true, message, ApiStatusCode.Success, data);
    }

    public static Created<T>(data: T, message: string = 'Resource created successfully'): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(true, message, ApiStatusCode.Created, data);
    }

    public static NoContent<T>(data?: T, message: string = 'Resource no content'): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(true, message, ApiStatusCode.NoContent, data);
    }

    public static NotFound<T>(message: string = 'Resource not found'): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(false, message, ApiStatusCode.NotFound);
    }

    public static BadRequest<T>(message: string = 'Bad request', errors?: string[]): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(false, message, ApiStatusCode.BadRequest, undefined, errors);
    }

    public static Unauthorized<T>(message: string = 'Unauthorized access'): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(false, message, ApiStatusCode.Unauthorized);
    }

    public static Forbidden<T>(message: string = 'Access forbidden'): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(false, message, ApiStatusCode.Forbidden);
    }

    public static InternalError<T>(message: string = 'An internal server error occurred'): DynamicResponseMessage<T> {
        return new DynamicResponseMessage<T>(false, message, ApiStatusCode.InternalServerError);
    }
}