import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const erroMessage = "use lowercase, uppercase and digits";

const loginSchema = yup.object({

    username: yup.string().min(3).max(30).required("user name requried"),
    password: yup.string().min(8).max(25).matches(passwordPattern, { message: erroMessage })
        .required()
})
export default loginSchema;
