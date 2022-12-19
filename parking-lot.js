const configTime = {
    initTime: 1000,
    parkTime: 750,
    leaveTime: 500,
    checkTime: 100
}
const Car = (plateNumber, owner) => ({plateNumber, owner});
const ParkingLotRepository = (parkingCapacity) => {
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
        park, leave, check
    }
};

const parkingLot = (cap) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const action = ParkingLotRepository(cap);
            console.log(`Tempat parkir berhasil dibuat dengan kapasitas ${cap} kendaraan`)
            resolve(action);
        }, configTime.initTime);
    });
};
const EnigmaPark = async (parkingLotRepo) => {
    const {park, leave, check} = await parkingLotRepo(3);

    const parkFn = async (car) => {
        try {
            const res = await park(car);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    const leaveFn = async (plateNumber) => {
        try {
            const res = await leave(plateNumber);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    const parkingLotInfo = async () => {
        const res = await check();
        console.log(res);
    }


    await parkFn(Car('BE001', 'Alex'));
    await parkingLotInfo();
    await parkFn(Car('B2021', 'Blex'));
    await leaveFn('B2021');
    await parkFn(Car('C012', 'Clex'));
    await parkFn(Car('D0101', 'Dlex'));
    await leaveFn('B2019');
    await parkFn(Car('E3333', 'Elex'));
    await parkFn(Car('BE001', 'Alex'));
    await leaveFn('B2021');
    await parkingLotInfo();
    await leaveFn('BE001');
    await parkingLotInfo();
}
console.log("Enigma Parking Lot");
EnigmaPark(parkingLot);
