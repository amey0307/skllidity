import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const SchoolSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: { type: String, required: true },
}, { timestamps: true });

const School = mongoose.model('School', SchoolSchema);
export default School;