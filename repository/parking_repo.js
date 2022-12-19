const {configTime} = require("../config/config");
const {response} = require("../util/response_enum");
const parkingLotRepository = (parkingCapacity) => {
    let cars = [];
    const capacity = parkingCapacity;

    const findOne = (car) => {
        return new Promise((resolve) => {
            const existingCar = cars.find((c) => c.plateNumber === car.plateNumber);
            if (existingCar) {
                resolve(existingCar);
            } else {
                resolve(null);
            }
        })
    }
    const add = (car) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                cars.push(car);
                resolve(response.Success);
            }, configTime.parkTime);
        });
    };

    const remove = (car) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const slotNumber = cars.findIndex((c) => c.plateNumber === car.plateNumber);
                cars.splice(slotNumber, 1);
                resolve(response.Success);
            }, configTime.leaveTime);
        })
    };

    const getAll = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({capacity, remaining: capacity - cars.length, parkedCar: cars});
            }, configTime.checkTime);
        })
    };

    const getCurrentCar = () => {
        return cars.length
    }

    return {
        findOne, add, remove, getAll, capacity, getCurrentCar
    }
};

module.exports = {
    parkingLotRepository
}