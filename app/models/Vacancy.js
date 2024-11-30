const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const VacancySchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  status: {
    type:  String,
    enum : ['ACTIVE','BLOCKED'],
    default: 'ACTIVE'
  },
  vacancy: {
    type: String,
    required: true,
  },
  salaryForkStart: {
    type: Number,
    required: true,
  },
  salaryForkEnd: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

VacancySchema.method('toJSON', function () {
  return {
    id: this._id,
    userId: this.userId,
    status: this.status,
    company: this.company,
    vacancy: this.vacancy,
    salaryFork: {
      start: this.salaryForkStart,
      end: this.salaryForkEnd,
    },
    note: this.note,
    createdAt: this.createdAt,
  }
});

module.exports = mongoose.model('Vacancies', VacancySchema);
