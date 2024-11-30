const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const Vacancy = require('./../../models/Vacancy');
async function updateMyVacancy(user, vacancyId, params) {
  try {
    const myVacancy = await Vacancy.findOne({
      _id: vacancyId,
      userId: user.id,
    });
    if (!myVacancy) throw new AppError({status: 400, message: errorMessages.VACANCY_NOT_FOUND});
    myVacancy.set(params);
    return myVacancy.save();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = updateMyVacancy;

