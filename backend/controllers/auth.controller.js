import Student from '../models/student.model.js';
import School from '../models/school.model.js';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const schoolSignin = async (req, res) => {
    console.log(req.body);
    const school = await School.findOne({ email: "admin@vit.ac.in" });

    if (school) {
        if (req.body.password === "admin") {
            res.json({
                message: "Login successful to school",
                _id: school._id,
                name: school.name,
                email: school.email,
                phone: school.phone,
            });
            return;
        }
        else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    }
}

export const schoolSignup = async (req, res) => {
    //check is email already exists
    if (School.findOne({ email: null })) {
        return res.status(400).json({ message: "Email already exists" });
    }

    //generate random password
    const password = Math.random().toString(36).slice(-8);

    const student = new School({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcryptjs.hashSync(password, 10),
    })
    student.save();
    res.json({ message: "Student Signed up successfully", name: student });
}

export const schoolForgotPassword = async (req, res) => {
    const student = await School.findOne({ email: req.body.email });

    if (student) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'amey.tripathi2022@vitstudent.ac.in',
                pass: process.env.EMAIL
            }
        });

        const mailOptions = {
            from: 'amey.tripathi2022@vitstudent.ac.in',
            to: student.email,
            subject: 'Password Recovery',
            text: `You can reset your password by clicking on the following link: http://localhost:5173/new-password/${student._id}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    else {
        return res.status(400).json({ message: "Email not found" });
    }
}

export const schoolResetPassword = async (req, res) => {
    const student = await School.findOne
        ({
            _id: req.params.id
        });

    if (student) {
        student.password = bcryptjs.hashSync(req.body.password, 10);
        student.save();
        res.json({ message: "Password reset successful" });
    }
    else {
        return res.status(400).json({ message: "Invalid user" });
    }
}

export const studentSignin = async (req, res) => {
    const student = await School.findOne({ email: req.body.email });

    if (student) {
        if (bcryptjs.compareSync(req.body.password, student?.password)) {
            res.json({
                _id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
            });
            return;
        }
        else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    }
}

export const studentSignup = async (req, res) => {
    if (Student.findOne({ email: req.body.email })) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const student = new School({
        name: "Amey Tripathi",
        email: "palash.ghosh2022@vitstudent.ac.in",
        phone: "1234567890",
        password: bcryptjs.hashSync("123456", 10),
    })

    student.save();
    res.json({ message: "Student Signed up successfully", name: student });
}

export const sendMail = async (req, res) => {
    //find email of all the students
    const mail = await School.find({}).select('email');

    for (let i = 0; i < mail.length; i++) {
        console.log(mail[i].email);
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'amey.tripathi2022@vitstudent.ac.in',
            pass: process.env.EMAIL
        }
    });

    //send mail to all the students
    for (let i = 0; i < mail.length; i++) {
        const mailOptions = {
            from: 'amey.tripathi2022@vitstudent.ac.in',
            to: mail[i].email,
            subject: 'Test mail',
            text: 'Hello world'
        };
        //wait for 5 seconds
        setTimeout(() => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }, 5000);
    }
}