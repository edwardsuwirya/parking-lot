const {configTime} = require("../config/config");
const {Car} = require("../model/car");
const {response} = require("../util/response_enum");
const parkingService = (parkingLotRepository) => {
    const {findOne, add, remove, getAll, capacity, getCurrentCar} = parkingLotRepository;

    const initParkingLot = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Tempat parkir berhasil dibuat dengan kapasitas ${capacity} kendaraan`)
                resolve(response.Success);
            }, configTime.initTime);
        });
    }

    const parking = async (car) => {
        const existingCar = await findOne(car);
        if (existingCar) {
            console.log(`Mobil ${existingCar.owner} dengan nopol ${existingCar.plateNumber} sudah parkir sebelumnya.`);
        } else {
            if (getCurrentCar() === capacity) {
                console.log('Mohon maaf parkir sudah penuh.');
            } else {
                await add(car);
                console.log(`Mobil ${car.owner} dengan nopol ${car.plateNumber} berhasil parkir.`);
            }
        }
    }
    const leaving = async (plateNumber) => {
        const existingCar = await findOne(Car(plateNumber));
        if (existingCar) {
            remove(existingCar);
            console.log(`Mobil ${existingCar.owner} dengan nopol ${existingCar.plateNumber} sudah keluar.`)
        } else {
            console.log(`Mobil dengan nopol ${plateNumber} tidak ada.`)
        }
    }
    const checkInfo = async () => {
        const res = await getAll();
        console.log(res);
    }


    return {
        initParkingLot, parking, leaving, checkInfo
    }
};

module.exports = {
    parkingService
}