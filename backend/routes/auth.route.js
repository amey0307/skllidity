import express from "express";
import { schoolSignin, schoolSignup, studentSignin, studentSignup, sendMail, schoolResetPassword, schoolForgotPassword, getStudents, deleteUser, sendGreetMail } from "../controllers/auth.controller.js";
const router = express.Router();

//demo api
router.post('/demo', (req, res) => {
    res.json({ message: "Api is working" });
});

router.post('/school/signup', schoolSignup)
router.post('/school/signin', schoolSignin)
router.post('/student/signup', studentSignup)
router.post('/student/signin', studentSignin)
router.post('/sendmail', sendMail)
router.post('/forgotpassword', schoolForgotPassword)
router.post('/resetpassword/:id', schoolResetPassword)
router.get('/getStudents', getStudents)
router.delete('/deleteStudent', deleteUser)
router.post('/greetMail', sendGreetMail)

export default router;