import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware'

interface IParamProps {
    id?: number;
}

interface IBodyProps {
    nome: string;
}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0)
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3)
    }))
}))

export const updateById = (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    console.log(req.params);
    console.log(req.body);

    res.status(500).send("Não implementado");
}