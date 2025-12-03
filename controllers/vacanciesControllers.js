import nodemailer from "nodemailer";
import axios from "axios";
import "dotenv/config";
import HttpError from "../helpers/HttpError.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export const sendEmail = async (req, res, next) => {
  try {
    console.log("1. Запрос пришёл на бэкенд", new Date().toISOString());
    const { name, surname, phoneNumber, recaptchaToken } = req.body;

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    });

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      throw HttpError(400, "Виглядаєте як робот, спробуйте ще раз");
    }

    console.log(
      "2. reCAPTCHA пройдена, начинаем отправку письма",
      new Date().toISOString()
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TARGET_EMAIL,
      subject: "Нова заявка",
      text: `Новий претендент на вакансію: ${name} ${surname}\nНомер телефону: ${phoneNumber}`,
    });

    console.log("3. Письмо успешно отправлено", new Date().toISOString());

    return res.status(201).json({
      success: true,
      message: "Заявку успішно надіслано!",
    });
  } catch (error) {
    next(error);
  }
};
