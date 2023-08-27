import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware'

interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0)
    }))
}));

export const getById = (req: Request<IParamProps>, res: Response) => {
    console.log(req.params);
    res.status(500).send("Não implementado");
}