const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    title: String,
    description: String,
    image: String,
    public: Boolean,
    created: String,
    
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;