const addNewService = require(`${process.cwd()}/modules/services/api/v1/controllers/addNewService`);
const updateService = require(`${process.cwd()}/modules/services/api/v1/controllers/updateService`);
const deleteService = require(`${process.cwd()}/modules/services/api/v1/controllers/deleteService`);
const getAllService = require(`${process.cwd()}/modules/services/api/v1/controllers/getAllService`);
const getService = require(`${process.cwd()}/modules/services/api/v1/controllers/getService`);
const uploadServiceImage = require(`${process.cwd()}/modules/services/api/v1/controllers/uploadServiceImage`);

const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);
const upload = require(`${process.cwd()}/modules/cases/api/v1/middleware/upload`);

const express = require('express');
const servicesRouter = express.Router();



servicesRouter.route('/create-service').post(verifyToken, addNewService);
servicesRouter.route('/update-service/:id').post(verifyToken, updateService);
servicesRouter.route('/delete-service/:id').delete(verifyToken, deleteService);
servicesRouter.route('/get-service/:id').get(getService);
servicesRouter.route('/get-all-service').get(getAllService);
servicesRouter.route('/:serviceId/upload-service-image').post(verifyToken, upload.single('image'), uploadServiceImage);



module.exports = servicesRouter;