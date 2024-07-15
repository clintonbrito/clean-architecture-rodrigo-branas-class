import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import database from "../database/database";

export default class ParkingLotRepositorySQL implements ParkingLotRepository {
    async getParkingLot(code: string): Promise<ParkingLot> {
        const query = "select *, (select count(*) from example.parked_car pc where pc.code = pl.code)::int as occupied_spaces from example.parking_lot pl where pl.code = $1"
        const parkingLotData = await database.oneOrNone(query, [code]);
        return ParkingLotAdapter.create(
            parkingLotData.code, 
            parkingLotData.capacity, 
            parkingLotData.open_hour, 
            parkingLotData.close_hour,
            parkingLotData.occupiedSpaces
        )
    }
    async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
        const query = "insert into example.parked_car pc (code, plate, date) value ($1, $2, $3)";
        await database.none(query, [code, plate, date]);
    }

}