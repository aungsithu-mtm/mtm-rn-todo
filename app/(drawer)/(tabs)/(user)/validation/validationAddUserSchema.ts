import * as Yup from "yup";

const isRequired = (field: string) => {
  return `${field} is required`;
};

const AddUserSchema = Yup.object().shape({
  username: Yup.string()
    .max(20, "Username must be at most 20 characters")
    .required(isRequired("Username")),
  email: Yup.string().email('Invalid email').required(isRequired("Email")),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required(isRequired("Password")),
});

export default AddUserSchema;
