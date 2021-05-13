import { sign, verify } from "jsonwebtoken";
import { inject } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    email: string;
    sub: string;
}

class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<string> {
        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;
        const {
            expires_in_refresh_token,
            secret_refresh_token,
            expire_refresh_token_days,
        } = auth;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token,
        });

        const expire_date = this.dateProvider.addDays(
            expire_refresh_token_days
        );

        await this.usersTokensRepository.create({
            expire_date,
            refresh_token,
            user_id,
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };
