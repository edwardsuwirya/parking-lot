const {parkingLotRepository} = require("./repository/parking_repo");
const {parkingService} = require("./service/parking_service");
const {Car} = require("./model/car");
const EnigmaPark = async () => {

    const parkingRepo = parkingLotRepository(3);
    const {initParkingLot, parking, leaving, checkInfo} = parkingService(parkingRepo);


    await initParkingLot();
    await parking(Car('BE001', 'Alex'));
    await checkInfo();
    await parking(Car('B2021', 'Blex'));
    await leaving('B2021');
    await parking(Car('C012', 'Clex'));
    await parking(Car('D0101', 'Dlex'));
    await leaving('B2019');
    await parking(Car('E3333', 'Elex'));
    await parking(Car('BE001', 'Alex'));
    await leaving('B2021');
    await checkInfo();
    await leaving('BE001');
    await checkInfo();
}
console.log("Enigma Parking Lot");
EnigmaPark();
