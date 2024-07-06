const router = require("express").Router();
const { controller: busController } = require("../api/v1/bus");
const { controller: authController } = require("../api/v1/auth");

// Auth related all route are here

router.route('/api/v1/auth/register').post(authController.register);
router.route("/api/v1/auth/login").post(authController.login);

// Bus related all ruter are here

router
  .route("/api/v1/buses")
  .get(busController.findAll)
  .post(busController.create);

module.exports = router;
