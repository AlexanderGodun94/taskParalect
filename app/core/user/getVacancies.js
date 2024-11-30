const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');


const Vacancy = require('./../../models/Vacancy');
async function getVacancies(user) {
  try {
    const vacancies = await Vacancy.find().sort({ createdAt: 'desc' });
    return vacancies.map(vacancy => {
      const vacancyObj = vacancy.toJSON();
      vacancyObj.myVacancy = vacancy.userId.toString() === user.id;
      return vacancyObj;
    });
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getVacancies;

