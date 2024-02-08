import React from "react";
import { Formik } from "formik";
import {Input, Tag} from "antd";
import {addNewStudent} from "../client";

const inputButtonMargin = {marginBottom: '5px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputButtonMargin};

const AddStudentForm = (props) => {
    return (
        <div>
            <Formik
                initialValues={{firstName: '', lastName: '', email: '', gender: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.firstName) {
                        errors.firstName = 'First Name Required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Last Name Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.gender) {
                        errors.gender = 'GenderRequired';
                    }else if (!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)) {
                    errors.gender = 'Gender must be (MALE, male, FEMALE, female)';}
                    return errors;
                }}
                onSubmit={(student, {setSubmitting}) => {
                        addNewStudent(student).then(()=>{
                            props.onSuccess();
                        })
                        .catch(err =>{
                                props.onFailure(err);
                        })
                    .finally(() =>{
                        setSubmitting(false);
                    })
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      submitForm,
                      isValid
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={inputButtonMargin}
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder='First Name'
                        />
                        {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
                        <Input
                            style={inputButtonMargin}
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder='Last Name'
                        />
                        {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
                        <Input
                            style={inputButtonMargin}
                            type='email'
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email'
                        />
                        {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
                        <Input
                            style={inputButtonMargin}
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            placeholder='Gender'
                        />
                        {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
                        <button
                            onClick={()=> submitForm}
                            type="submit"
                            disabled={isSubmitting || (touched && !isValid)}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default AddStudentForm;
