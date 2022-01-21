import * as yup from "yup";

export const replySchema = yup.object().shape({
    body: yup.string().min(1).max(240).required(),
});
