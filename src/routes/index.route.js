const managerController = require('../controllers/manager.controller')
const managerRoute = require("./manager.route").default

let _r = (route) => {
  return "/" + "api" + route;
};

export function configureRoutes(app) {
  app.use(_r("/"), managerRoute);
}
