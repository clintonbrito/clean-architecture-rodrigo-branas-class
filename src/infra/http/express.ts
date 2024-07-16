import Express from "express";
import ExpressAdapter from "../../adapter/ExpressAdapter";
import ParkingLotController from "../../controller/ParkingLotController";


const app = new Express();

app.get("/parkingLots/:code", ExpressAdapter.create(ParkingLotController.getParkingLot));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });
