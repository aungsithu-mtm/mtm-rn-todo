import * as Yup from "yup";

const isRequired = (field: string) => {
    return `${field} is required`;
};

const PasswordChangeSchema = () =>
    Yup.object().shape({
        currentPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required(isRequired("Old Password")),
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required(isRequired("New Password")),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Confirm password doesn't match.")
            .required(isRequired("Confirm Password")),
    });

export default PasswordChangeSchema;
