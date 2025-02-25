const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String, 
        required: true },

    description: { type: String, 
        required: true },

    startDate: {
        type: Date,
        required: true
      },

      endDate: {
        type: Date,
        required: true
      }
});

module.exports = mongoose.model('Project', projectSchema);