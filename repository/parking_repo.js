const {configTime} = require("../config/config");
const parkingLotRepository = (parkingCapacity) => {
    let cars = [];
    const capacity = parkingCapacity;
    const park = (car) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (cars.some((parkedCar) => car.plateNumber === parkedCar.plateNumber)) {
                    reject(`Mobil ${car.owner} dengan nopol ${car.plateNumber} sudah parkir sebelumnya.`);
                } else {
                    if (cars.length === capacity) {
                        reject('Mohon maaf parkir sudah penuh.');
                    } else {
                        cars.push(car);
                        resolve(`Mobil ${car.owner} dengan nopol ${car.plateNumber} berhasil parkir.`);
                    }
                }
            }, configTime.parkTime);
        });
    };

    const leave = (plateNumber) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const car = cars.find((car) => car.plateNumber === plateNumber);

                if (!car) {
                    reject(`Mobil dengan nopol ${plateNumber} tidak ada.`);
                } else {
                    const slotNumber = cars.findIndex((car) => car.plateNumber === plateNumber);
                    cars.splice(slotNumber, 1);
                    resolve(`Mobil ${car.owner} dengan nopol ${car.plateNumber} sudah keluar.`);
                }
            }, configTime.leaveTime);
        })
    };

    const check = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({capacity, remaining: capacity - cars.length, parkedCar: cars});
            }, configTime.checkTime);
        })
    };

    return {
        park, leave, check, capacity
    }
};

module.exports = {
    parkingLotRepository
}