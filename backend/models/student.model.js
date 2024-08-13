import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: { type: String, required: false },
    role: { type: String, default: "student" }
});

const Student = mongoose.model('Student', StudentSchema);
export default Student;