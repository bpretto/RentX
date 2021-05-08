import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Test Brand",
            name: "Test Name",
            description: "Test Description",
            daily_rate: 100,
            license_plate: "xxx-0000",
            fine_amount: 40,
            category_id: "1234",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is an already existing rental for specified user", async () => {
        const car = await rentalsRepositoryInMemory.create({
            car_id: "car1",
            expected_return_date: dayAdd24Hours,
            user_id: "test",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "test",
                car_id: "car2",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError(
                "There is a car already rented for the specified user!"
            )
        );
    });

    it("Should not be able to create a new rental if there is an already existing rental for specified car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "user1",
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "user2",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable!"));
    });

    it("Should not be able to create a new rental if total rental time is less than 24 hours", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "user1",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("The minimal rental time is 24 hours!"));
    });
});
