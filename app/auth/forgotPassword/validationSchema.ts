import * as Yup from "yup";

const isRequired = (field: string) => {
  return `${field} is required`;
};

const validationForgotSchema = (isSend: boolean) =>
  Yup.object().shape({
    email: Yup.string().email("Invalid email").required(isRequired("Email")),
    code: isSend === true ? Yup.string()
      .min(6, "Code must be at least 6 numbers long.")
      .max(6, "Code must be at most 6 numbers long.")
      .required(isRequired("Code")) : Yup.string(),
    password: isSend === true ? Yup.string().min(6, 'Password must be at least 6 characters').required(isRequired("Password")) : Yup.string(),
  });

export default validationForgotSchema;
