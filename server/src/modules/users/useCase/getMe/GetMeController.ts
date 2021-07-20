import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetMeUseCase } from "./GetMeUseCase";

class GetMeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getMeUseCase = container.resolve(GetMeUseCase);

    const user = await getMeUseCase.execute(id);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response.json(userResponse);
  }
}

export { GetMeController };
