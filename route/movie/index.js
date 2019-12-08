const express = require("express");

const movie = require("../../controllers/movie/movie");
const space = require("../../controllers/movie/space");
const room = require("../../controllers/movie/room");
const session = require("../../controllers/movie/session");
const tiket = require("../../controllers/movie/tiket");

const { checkRole } = require("../../utils/checkRole");
const { authenticateJWT } = require("../../passport");

const router = express.Router();

// films
router.get("/", movie.getMovie); // get list with query params
router.post("/", authenticateJWT, checkRole(1), movie.createMovie); // create
router.put("/:id", authenticateJWT, checkRole(1), movie.updateMovie); // update
router.delete("/:id", authenticateJWT, checkRole(1), movie.deleteMovie); // remove

// session
router.get("/session", session.getSessionList); // get list with query params
router.post("/session", authenticateJWT, checkRole(1), session.createSession); // create
router.put("/session/:id", authenticateJWT, checkRole(1), session.updateSession); // update
router.delete("/session/:id", authenticateJWT, checkRole(1), session.removeSession); // remove

// space
router.get("/space", space.getSpace); // get list with query params
router.get("/space-shadow", space.getShadowSpace); // get shadow list with query params
router.post("/space", authenticateJWT, checkRole(1), space.createSpace); // create one space
router.post("/spacemult", authenticateJWT, checkRole(1), space.createSpaceMulty); // create space multiple times
router.put("/space/:id", authenticateJWT, space.updateSpace); // change free parametr for one shadow space
router.put("/space-booked/:id", authenticateJWT, space.bookedSpace); // change booked parametr for one shadow space
router.delete("/space/:id", authenticateJWT, checkRole(1), space.removeSpace); // remove by id

// rooms
router.get("/room", room.getRoomList); // get all rooms
router.post("/room", authenticateJWT, checkRole(1), room.createRoom); // create
router.put("/room/:id", authenticateJWT, checkRole(1), room.editRoom); // edit
router.delete("/room/:id", authenticateJWT, checkRole(1), room.removeRoom); // remove room and all space inside

// tiket
router.get("/tiket", authenticateJWT, tiket.getTiketByUser); // get all tikets for current user
router.post("/tiket", authenticateJWT, tiket.createTiket); // create

module.exports = router;
