import {
    View,
    ScrollView,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Formik } from "formik";
import validationAddTaskSchema from "../validation/validationAddTaskSchema";
import { AddTaskForm, EditTaskForm } from "@/types";
import { CustomTextInput, MICON, DateTimeInput } from "@/components/Form";
import { ExecuteButton } from "@/components/Button";
import { useThemeContext } from "@/context/ThemeContext";
import styles from "./styles";

type Props = {
    initialValue: AddTaskForm | EditTaskForm;
    handleForm: (data: AddTaskForm | EditTaskForm) => void;
    loading?: boolean,
    error?: any
    mode: 'create' | 'edit'
};

const TaskForm: React.FC<Props> = ({
    handleForm,
    initialValue,
    loading,
    error,
    mode
}) => {
    const { colors } = useThemeContext();
    return (
        <ScrollView>
            <View style={[styles.formContainer, { flex: 1 }]}>
                <Formik
                    initialValues={initialValue}
                    onSubmit={(values) => handleForm(values)}
                    validationSchema={validationAddTaskSchema}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        errors,
                        values,
                        touched,
                    }) => (
                        <>
                            {/* Title Field */}
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    label="Title"
                                    fieldName="Title"
                                    handleChange={handleChange("title")}
                                    handleBlur={handleBlur("title")}
                                    errors={errors.title}
                                    touched={touched.title}
                                    value={values.title || ""}
                                    name="title"
                                    color={colors.primaryTextColor}
                                />
                            </View>
                            {/* Date Field*/}
                            <View style={styles.inputContainer}>
                                <DateTimeInput
                                    label="Date"
                                    handleChange={handleChange("date")}
                                    handleBlur={handleBlur("date")}
                                    value={values.date}
                                    errors={errors.date}
                                    touched={touched.date}
                                    mode="date"
                                    name="date"
                                    color={colors.primaryTextColor}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {/* Start Time Field*/}
                                <View style={styles.halfInputContainer}>
                                    <DateTimeInput
                                        label="From Time"
                                        handleChange={handleChange("fromTime")}
                                        handleBlur={handleBlur("fromTime")}
                                        value={values.fromTime || ''}
                                        errors={errors.fromTime}
                                        touched={touched.fromTime}
                                        mode="time"
                                        name="fromTime"
                                        color={colors.primaryTextColor}
                                    />
                                </View>
                                {/* To Time Field*/}
                                <View style={styles.halfInputContainer}>
                                    <DateTimeInput
                                        label="To Time"
                                        handleChange={handleChange("toTime")}
                                        handleBlur={handleBlur("toTime")}
                                        value={values.toTime || ''}
                                        errors={errors.toTime}
                                        touched={touched.toTime}
                                        mode="time"
                                        name="toTime"
                                        color={colors.primaryTextColor}
                                    />
                                </View>
                            </View>
                            {/* Description Field*/}
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    label="Description"
                                    fieldName="description"
                                    handleChange={handleChange("description")}
                                    handleBlur={handleBlur("description")}
                                    errors={errors.description}
                                    touched={touched.description}
                                    value={values.description || ""}
                                    name="description"
                                    color={colors.primaryTextColor}
                                    multiline={true}
                                    numberOfLines={3}
                                />
                            </View>

                            {/* Buttons */}
                            <ExecuteButton
                                loading={loading}
                                handleSubmit={handleSubmit}
                                style={{ backgroundColor: colors.primaryTextColor }}
                                btnLabel={mode === 'edit' ? 'Edit' : "Create"}
                                labelStyle={[styles.btnText, { color: colors.primaryBgColor }]}
                            />
                        </>
                    )}
                </Formik>
            </View >
        </ScrollView>

    );
};

export default TaskForm;


