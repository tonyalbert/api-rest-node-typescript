import { RequestHandler } from "express";
import { Maybe, ObjectSchema, AnyObject, ValidationError } from "yup";

type TProperty = 'body' | 'params' | 'query' | 'headers';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (TGetAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
        } catch (error) {
            const yupError = error as ValidationError;
            const errors: Record<string, string> = {};
    
            yupError.inner.forEach(error => {
                if(!error.path) return;
                errors[error.path] = error.message;
            })

            errorsResult[key] = errors;
        } 
    })

    if(Object.entries(errorsResult).length) {
        return res.status(400).json({
            errors: errorsResult
        });
    } else {
        return next();
    }
};
