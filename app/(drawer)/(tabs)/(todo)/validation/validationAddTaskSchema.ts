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
    date: Yup.string()
        .required(isRequired("Date")),
    fromTime: Yup.string()
        .matches(/^([01]?\d|2[0-3]):[0-5]\d$/, "From Time must be in HH:mm format")
        .test("fromTime-required-with-toTime", isRequired("From Time"), function (value) {
            const { toTime } = this.parent;
            return !toTime || !!value;
        }),
    toTime: Yup.string()
        .matches(/^([01]?\d|2[0-3]):[0-5]\d$/, "To Time must be in HH:mm format")
        .test("toTime-required-with-fromTime", isRequired("To Time"), function (value) {
            const { fromTime } = this.parent;
            return !fromTime || !!value;
        })
        .test("toTime-greater-than-fromTime", "To Time must be greater than From Time", function (value) {
            const { fromTime } = this.parent;
            if (!fromTime || !value) return true; // Skip validation if either field is empty
            return fromTime < value; // Ensure fromTime is earlier than toTime
        }),
});

export default AddTaskSchema;
