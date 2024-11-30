const errorMessages = require('../services/errorMessages');
const AppError = require('../services/error');
const respond = require('../middlewares/respond');
const reqAuth = require('../middlewares/reqAuth');
const reqUser = require('../middlewares/reqUser');

const createUser = require('../core/user/createUser');

const createVacancy = require('../core/user/createVacancy');
const getVacancies = require('../core/user/getVacancies');
const updateMyVacancy = require('../core/user/updateMyVacancy');

module.exports = function () {

  const app = this.app;

  app.route('/api/v1/user')
    .get(reqAuth, reqUser, (req, res) => {
      respond(res, 200, req.user);
    })
    .post((req, res) => {
      if (!req.body.email || !req.body.password)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 201, createUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName));
    });

  app.route('/api/v1/user/vacancies')
    .get(reqAuth, reqUser, (req, res) => {
      respond(res, 200, getVacancies(req.user, req.body.company, req.body.vacancy, req.body.salaryForkStart, req.body.salaryForkEnd, req.body.note));
    });

  app.route('/api/v1/user/vacancy')
    .post(reqAuth, reqUser, (req, res) => {
      if (!req.body.company || !req.body.vacancy || !req.body.salaryForkStart || !req.body.salaryForkEnd || !(req.body.status === 'BLOCKED' || req.body.status === 'ACTIVE'))
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 201, createVacancy(req.user, req.body.company, req.body.vacancy, req.body.salaryForkStart, req.body.salaryForkEnd, req.body.note, req.body.status));
    })
    .put(reqAuth, reqUser, (req, res) => {
      if (!req.body.vacancyId) return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      const params = {};
      if (req.body.company) params.company = req.body.company;
      if (req.body.vacancy) params.vacancy = req.body.vacancy;
      if (req.body.salaryForkStart) params.salaryForkStart = req.body.salaryForkStart;
      if (req.body.salaryForkEnd) params.salaryForkEnd = req.body.salaryForkEnd;
      if (req.body.note) params.note = req.body.note;
      if (req.body.status && (req.body.status === 'BLOCKED' || req.body.status === 'ACTIVE')) params.status = req.body.status;
      respond(res, 200, updateMyVacancy(req.user, req.body.vacancyId, params));
    });


};

