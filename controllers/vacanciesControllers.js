import axios from "axios";
import "dotenv/config";
import HttpError from "../helpers/HttpError.js";
import { Resend } from "resend";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res, next) => {
  try {
    console.log("[START] Processing vacancy application");
    const { name, surname, phoneNumber, recaptchaToken } = req.body;

    console.log("[RECAPTCHA] Starting verification");
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

    const recaptchaStart = Date.now();
    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
      timeout: 10000,
    });
    console.log(`[RECAPTCHA] Completed in ${Date.now() - recaptchaStart}ms`);

    const { success, score } = response.data;
    console.log(`[RECAPTCHA] Result - success: ${success}, score: ${score}`);

    if (!success || score < 0.5) {
      console.log("[RECAPTCHA] Validation failed");
      throw HttpError(400, "Виглядаєте як робот, спробуйте ще раз");
    }

    console.log("[EMAIL] Starting to send email");
    const emailStart = Date.now();
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.TARGET_EMAIL,
      subject: "Нова заявка",
      text: `Новий претендент на вакансію: ${name} ${surname}\nНомер телефону: ${phoneNumber}`,
    });
    console.log(`[EMAIL] Sent successfully in ${Date.now() - emailStart}ms`);

    console.log("[SUCCESS] Request completed");
    return res.status(201).json({
      success: true,
      message: "Заявку успішно надіслано!",
    });
  } catch (error) {
    console.error("[ERROR]", error.message);
    next(error);
  }
};
