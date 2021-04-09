import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description1",
            daily_rate: 100.0,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "Car brand1",
            category_id: "category_id1",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description2",
            daily_rate: 100.0,
            license_plate: "ABC-2468",
            fine_amount: 40,
            brand: "Car brand2",
            category_id: "category_id2",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car brand2",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description3",
            daily_rate: 100.0,
            license_plate: "ABC-4321",
            fine_amount: 40,
            brand: "Car brand3",
            category_id: "category_id3",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Car description4",
            daily_rate: 100.0,
            license_plate: "ABC-4444",
            fine_amount: 40,
            brand: "Car brand4",
            category_id: "category_id4",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id4",
        });

        expect(cars).toEqual([car]);
    });
});
