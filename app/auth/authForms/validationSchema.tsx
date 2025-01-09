import { ModalType } from '@/enums/common';
import * as Yup from 'yup';

const isRequired = (field: string) => {
    return `${field} is required`
}

// Define the validation schema
const validationAuthSchema = (mode: ModalType) => Yup.object().shape({
    email: Yup.string().email('Invalid email').required(isRequired("Email")),
    // password: Yup.string().min(6, 'Password must be at least 6 characters').required(isRequired("Password")),
    // username: mode === ModalType.SignUp ? Yup.string().required(isRequired("Username")) : Yup.string(),
});

export default validationAuthSchema;
