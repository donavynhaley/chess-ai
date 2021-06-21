import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
});

const initialFormValues = {
    name: "",
    password: "",
}


const resetForm = (values) => {
    Object.keys(values).forEach(key => (values[key] = ""));  //<- Reseting all fields using blank space
}

const LoginForm = () => {
    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={LoginSchema}
            onSubmit={values => {
                resetForm(values)
            }}
        >
            {({ errors, touched }) => (
                <Form className="form">
                    <div className="form-group">
                        <Field name="email" type="email" className={`input ${errors.email && touched.namemaile ? "input-error" : ""}`} placeholder="Email" />
                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                    </div>
                    <div className="form-group">
                        <Field name="password"
                            type="password" className={`input ${errors.password && touched.password ? "input-error" : ""}`} placeholder="Password" id="password-input" />
                        {errors.password && touched.password ? (
                            <div className="error">{errors.password}</div>
                        ) : null}
                    </div>
                    <Button variant="outlined" color="secondary">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
