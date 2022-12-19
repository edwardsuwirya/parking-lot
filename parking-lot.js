const {parkingLotRepository} = require("./repository/parking_repo");
const {parkingService} = require("./service/parking_service");
const {Car} = require("./model/car");
const EnigmaPark = () => {

    return async () => {
        const parkingRepo = parkingLotRepository(3);
        const {parkFn, leaveFn, parkingLotInfo} = await parkingService(parkingRepo);


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
    };

}
console.log("Enigma Parking Lot");
EnigmaPark()();
