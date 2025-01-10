import * as Yup from "yup";

const validationCodeSchema = () =>
    Yup.object().shape({
        code: Yup.string()
            .min(6, "Code must be at least 6 numbers long.")
            .max(6, "Code must be at most 6 numbers long.")
            .required("Code is required"),
    });

export default validationCodeSchema;
