const {configTime} = require("../config/config");
const parkingService = async (parkingLotRepository) => {
    const {park, leave, check, capacity} = parkingLotRepository;

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
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Tempat parkir berhasil dibuat dengan kapasitas ${capacity} kendaraan`)
            resolve({
                parkFn, leaveFn, parkingLotInfo
            });
        }, configTime.initTime);
    });
};

module.exports = {
    parkingService
}