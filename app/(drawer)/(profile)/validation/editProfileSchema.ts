import * as Yup from "yup";

const isRequired = (field: string) => {
    return `${field} is required`;
};

const EditProfileSchema = Yup.object().shape({
    username: Yup.string()
        .max(20, "Username must be at most 20 characters")
        .required(isRequired("Username")),
    firstName: Yup.string()
        .min(2, "FirstName must be at least 2 characters")
        .max(20, "Username must be at most 20 characters"),
    lastName: Yup.string()
        .min(2, "LastName must be at least 2 characters")
        .max(20, "Username must be at most 20 characters"),
    address: Yup.string().nullable(),
    phone: Yup.string().nullable(),
    email: Yup.string().email('Invalid email').required(isRequired("Email")),
});

export default EditProfileSchema;
