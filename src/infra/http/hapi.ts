import Hapi from "@hapi/hapi";
import ParkingLotController from "../../controller/ParkingLotController";
import HapiAdapter from "../../adapter/HapiAdapter";

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

server.route({
    method: 'GET',
    path: '/parkingLots/{code}',
    handler: HapiAdapter.create(ParkingLotController.getParkingLot)
})

server.start();