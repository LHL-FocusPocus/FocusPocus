var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Link, TextField, CssBaseline, Button, Container, } from "@material-ui/core";
import useFormFields from "../hooks/useFormFields";
import validEmail from "../helpers/validEmail";
import axios from "axios";
var useStyles = makeStyles(function (theme) { return ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#6C63FF",
    },
}); });
var Wrapper = styled(Container)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 0.5px solid slategrey;\n  border-radius: 1em;\n  padding: 2em;\n  z-index: 5;\n  background-color: white;\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);\n"], ["\n  border: 0.5px solid slategrey;\n  border-radius: 1em;\n  padding: 2em;\n  z-index: 5;\n  background-color: white;\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);\n"])));
var Img = styled.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 57%;\n  transform: translateY(-2em);\n"], ["\n  width: 57%;\n  transform: translateY(-2em);\n"])));
var LoginWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 1;\n  margin-right: 7%;\n  display: flex;\n  margin-top: 1%;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  @media (max-width: 1300px) {\n    margin: auto;\n    margin-bottom: 2em;\n  }\n"], ["\n  flex: 1;\n  margin-right: 7%;\n  display: flex;\n  margin-top: 1%;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  @media (max-width: 1300px) {\n    margin: auto;\n    margin-bottom: 2em;\n  }\n"])));
var PrivacyPolicy = styled.a(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 0.9em;\n  color: white;\n  text-decoration: none;\n  margin-top: 2%;\n"], ["\n  font-size: 0.9em;\n  color: white;\n  text-decoration: none;\n  margin-top: 2%;\n"])));
export default function SignUp(_a) {
    var history = _a.history, setDashboard = _a.setDashboard;
    var classes = useStyles();
    var _b = useFormFields({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    }), fields = _b[0], handleFieldChange = _b[1];
    var _c = useState(false), error = _c[0], setError = _c[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        if (!validEmail(fields.email)) {
            return setError(true);
        }
        setError(false);
        var credentials = {
            email: fields.email,
            password: fields.password,
            firstName: fields.firstName,
            lastName: fields.lastName,
        };
        axios
            .post("/api/user/register", credentials)
            .then(function () {
            setDashboard()
                .then(function () {
                history.push("/dashboard");
            })
                .catch(function (error) {
                console.error(error.response);
            });
        })
            .catch(function (error) {
            console.error(error.response);
        });
    };
    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }
    return (React.createElement(LoginWrapper, null,
        React.createElement(Wrapper, { className: classes.main, component: "main", maxWidth: "xs" },
            React.createElement(CssBaseline, null),
            React.createElement("div", { className: classes.paper },
                React.createElement(Img, { src: "/imgs/magic-trick.png", alt: "landing image" }),
                React.createElement(Typography, { component: "h1", variant: "h5" }, "Sign up"),
                React.createElement("form", { onSubmit: function (e) { return handleSubmit(e); }, className: classes.form, noValidate: true },
                    React.createElement(Grid, { container: true, spacing: 2 },
                        React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                            React.createElement(TextField, { autoComplete: "fname", variant: "outlined", required: true, fullWidth: true, id: "firstName", label: "First Name", value: fields.firstName, autoFocus: true, onChange: handleFieldChange })),
                        React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                            React.createElement(TextField, { variant: "outlined", required: true, fullWidth: true, id: "lastName", label: "Last Name", value: fields.lastName, autoComplete: "lname", onChange: handleFieldChange })),
                        React.createElement(Grid, { item: true, xs: 12 },
                            React.createElement(TextField, { variant: "outlined", required: true, fullWidth: true, id: "email", label: "Email", error: error, helperText: error ? "Not a valid email" : "", value: fields.email, autoComplete: "email", onChange: handleFieldChange })),
                        React.createElement(Grid, { item: true, xs: 12 },
                            React.createElement(TextField, { variant: "outlined", required: true, fullWidth: true, label: "Password", type: "password", id: "password", value: fields.password, autoComplete: "current-password", onChange: handleFieldChange }))),
                    React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit, disabled: !validateForm() }, "Sign Up"),
                    React.createElement(Grid, { container: true, justify: "flex-end" },
                        React.createElement(Grid, { item: true },
                            React.createElement(Link, { href: "/", variant: "body2" }, "Already have an account? Sign in")))))),
        React.createElement(PrivacyPolicy, { href: "https://www.termsfeed.com/live/8d4503cc-2341-4052-8309-1dddf62a5750" }, "Privacy Policy")));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=SignUp.js.map