import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

describe("Send Forgot Password Mail", () => {
    let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let dateProvider: DayjsDateProvider;
    let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
    let mailProvider: MailProviderInMemory;

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "357866",
            email: "test@email.com",
            name: "Sample name",
            password: "test",
        });

        await sendForgotPasswordMailUseCase.execute("test@email.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a forgot password mail to unexistent user", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("unexistent@email.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an user's token", async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "357866",
            email: "test@email.com",
            name: "Sample name",
            password: "test",
        });

        await sendForgotPasswordMailUseCase.execute("test@email.com");

        expect(generateTokenMail).toBeCalled();
    });
});
