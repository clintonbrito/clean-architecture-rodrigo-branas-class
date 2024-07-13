import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";
import GetParkingLot from '../src/core/usecase/GetParkingLot';
import ParkingLotRepositorySQL from "../src/infra/repository/ParkingLotRepositorySQL";

test("Should get parking lot", async function() {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
    const parkingLot = await getParkingLot.execute("shopping");
    console.log(parkingLot);
    expect(parkingLot.code).toBe("shopping");
})

test("Should enter parking lot", async function() {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
    const parkingLostBeforeEnter = await getParkingLot.execute("shopping");
    expect(parkingLostBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("shopping", "MMM-0001", new Date("2024-03-01T10:00:00"));
    
    const parkingLostAfterEnter = await getParkingLot.execute("shopping");
    expect(parkingLostAfterEnter.occupiedSpaces).toBe(1);
})

test.skip("Should be closed", async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
  const parkingLostBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLostBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2024-03-01T23:00:00"));
  
});

test.skip("Should be full", async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
  const parkingLostBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLostBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2024-03-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0002", new Date("2024-03-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0003", new Date("2024-03-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0004", new Date("2024-03-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0005", new Date("2024-03-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0006", new Date("2024-03-01T10:00:00"));
});
