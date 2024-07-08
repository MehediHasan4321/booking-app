const router = require("express").Router();
const { controller: busController } = require("../api/v1/bus");
const { controller: authController } = require("../api/v1/auth");
const { controller: userController } = require("../api/v1/user");
const authenticate = require("../middleware/authenticate");
const roleBasePermission = require("../middleware/roleBasePermission");

// Auth related all route are here

router.route("/api/v1/auth/register").post(authController.register);
router.route("/api/v1/auth/login").post(authController.login);

// Bus related all ruter are here

router
  .route("/api/v1/buses")
  .get(busController.findAll)
  .post(
    authenticate,
    roleBasePermission(["owner", "admin"]),
    busController.create
  );

router
  .route("/api/v1/buses/:id")
  .get(busController.findSingle)
  .put(
    authenticate,
    roleBasePermission(["owner", "admin"]),
    busController.updateOrCreate
  )
  .patch(
    authenticate,
    roleBasePermission(["owner", "admin"]),
    busController.updateByPatch
  )
  .delete(
    authenticate,
    roleBasePermission(["owner", "admin"]),
    busController.removeItem
  );

// User related all route a re here

router
  .route("/api/v1/users")
  .get(authenticate, roleBasePermission(["admin"]), userController.findAll);

router
  .route("/api/v1/users/:id")
  .get(
    authenticate,
    roleBasePermission(["user", "admin"]),
    userController.findSingle
  )
  .put(
    authenticate,
    roleBasePermission(["admin"]),
    userController.updateOrCreate
  )
  .patch(
    authenticate,
    roleBasePermission(["admin"]),
    userController.updatePropertie
  )
  .delete(
    authenticate,
    roleBasePermission(['admin']),
    userController.remove
  )
module.exports = router;
