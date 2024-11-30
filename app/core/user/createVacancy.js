const AppError = require('../../services/error');
const Vacancy = require('./../../models/Vacancy');
async function createVacancy(user, company, vacancy, salaryForkStart, salaryForkEnd, note, status) {
  try {
    return  await Vacancy.create({
      userId: user.id,
      company: company,
      vacancy: vacancy,
      salaryForkStart: salaryForkStart,
      salaryForkEnd: salaryForkEnd,
      note: note,
      status: status,
    });
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = createVacancy;

