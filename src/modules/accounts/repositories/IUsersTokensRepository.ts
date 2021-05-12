import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokenRepository {
    create({
        expire_date,
        user_id,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokenRepository };
