import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimalRentalTime = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Car is unavailable!");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );

        if (rentalOpenToUser) {
            throw new AppError(
                "There is a car already rented for the specified user!"
            );
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            expected_return_date,
            dateNow
        );

        if (compare < minimalRentalTime) {
            throw new AppError("The minimal rental time is 24 hours!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
