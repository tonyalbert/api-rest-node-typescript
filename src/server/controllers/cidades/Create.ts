import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware'

interface ICidade {
    nome: string;
};

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3)
    }))
}));

export const create = (req: Request<{}, {}, ICidade>, res: Response) => {
    
    res.status(500).send("Não implementado");
};