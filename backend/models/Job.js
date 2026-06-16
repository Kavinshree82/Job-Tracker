const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'], default: 'Applied' },
  deadline: { type: Date },
  notes: { type: String },
  tags: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);