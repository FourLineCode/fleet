import * as yup from "yup";

export const signinShema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(18).required(),
});
