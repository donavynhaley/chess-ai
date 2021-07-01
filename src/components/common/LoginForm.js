import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
});

const initialFormValues = {
    email: "",
    password: "",
}

const LoginForm = ({ isLogin, setOpenModal, setIsLoggedIn }) => {

    /* API Calls */
    const backend = axios.create({
        baseURL: process.env.REACT_APP_BE_URL
    })

    const register = userCredentials => {
        const promise = backend.post(
            `register`,
            userCredentials,
        );

        promise
            .then(res => {
                console.log(res.data)
                resetForm(userCredentials)
                setOpenModal(false)
            })
            .catch(e => {
                console.log(e)
            });
    }

    const login = userCredentials => {
        const promise = backend.post(
            `login`,
            userCredentials,
        );

        promise
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('email', res.data.email)
                console.log(res.data)
                setIsLoggedIn(true)
                resetForm(userCredentials)
                setOpenModal(false)
            })
            .catch(e => {
                console.log(e)
            });
    }

    /* Form Logic */
    const postLogin = (values) => {
        isLogin === "Login" ? login(values) : register(values)
    }

    const resetForm = (values) => {
        Object.keys(values).forEach(key => (values[key] = ""));  //<- Reseting all fields using blank space
    }

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={LoginSchema}
            onSubmit={values => {
                postLogin(values)
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
                    <Button type="submit" variant="outlined" color="secondary">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
