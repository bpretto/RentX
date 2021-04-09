import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
    handle(request: Request, response: Response) {
        const createCarSpecificationUseCase = container.resolve(
            CreateCarSpecificationUseCase
        );
    }
}

export { CreateCarSpecificationController };
