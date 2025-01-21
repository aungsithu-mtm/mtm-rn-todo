import * as Yup from "yup";

const isRequired = (field: string) => {
    return `${field} is required`;
};

const AddTaskSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(48, "Title must be at most 48 characters")
        .required(isRequired("Title")),
    description: Yup.string()
        .min(3, "Description must be at least 3 characters")
        .max(198, "Description must be at most 198 characters"),
    date: Yup.date()
        .typeError("Date must be a valid date")
        .required(isRequired("Date")),
    fromTime: Yup.string()
        .matches(/^([01]?\d|2[0-3]):[0-5]\d$/, "From Time must be in HH:mm format")
        .nullable(),
    toTime: Yup.string()
        .matches(/^([01]?\d|2[0-3]):[0-5]\d$/, "To Time must be in HH:mm format")
        .nullable(),
});

export default AddTaskSchema;
