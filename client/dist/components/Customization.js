var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";
var useStyles = makeStyles(function (theme) { return ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    },
    toast: { fontSize: 25 },
}); });
var Title = styled.h1(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 2em;\n  text-align: center;\n"], ["\n  font-size: 2em;\n  text-align: center;\n"])));
var FormContainer = styled(Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 65%;\n  margin: auto;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 65%;\n  margin: auto;\n"])));
var Wrapper = styled(Box)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  padding-right: 0.7em;\n"], ["\n  display: flex;\n  padding-right: 0.7em;\n"])));
var PaddedTextField = styled(TextField)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 0.5em;\n"], ["\n  margin: 0.5em;\n"])));
var CustomizeButton = styled(Button)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  margin: 0.5em;\n"], ["\n  width: 100%;\n  margin: 0.5em;\n"])));
export default function Customization(_a) {
    var userOptions = _a.userOptions, addCustomizations = _a.addCustomizations;
    var classes = useStyles();
    var _b = useFormFields({
        word: userOptions.noun,
        image: userOptions.imageUrl,
        video: userOptions.videoUrl,
    }), options = _b[0], handleOptionsChange = _b[1];
    var _c = useState({
        image: false,
        video: false,
    }), error = _c[0], setError = _c[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        // Check if input can be constructed into URL -> if not, setError (not in correct URL format that the extension requires)
        if (options.image) {
            try {
                new URL(options.image);
            }
            catch (_a) {
                return setError({ image: true });
            }
        }
        if (options.video) {
            try {
                new URL(options.video);
            }
            catch (_b) {
                return setError({ video: true });
            }
        }
        var userOptions = {
            word: options.word,
            image: options.image,
            video: options.video,
        };
        setError({ image: false, video: false });
        axios
            .post("/api/user/options/add", userOptions)
            .then(function () {
            toast("✔️ Customizations Set!", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                className: classes.toast
            });
        })
            .catch(function (e) {
            console.error(e);
            toast.error("⚠️ Customzations NOT set! Please try again. ⚠️", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };
    return (React.createElement("form", { onSubmit: handleSubmit, className: classes.root, noValidate: true, autoComplete: "off" },
        React.createElement(Title, null, "Customize Your Replacements"),
        React.createElement(Wrapper, null,
            React.createElement(FormContainer, null,
                React.createElement("div", null,
                    React.createElement(PaddedTextField, { label: "Word", variant: "outlined", helperText: "New Noun", id: "word", fullWidth: true, value: options.word || "", onChange: handleOptionsChange }),
                    React.createElement(PaddedTextField, { label: "Image", variant: "outlined", helperText: "Image URL", fullWidth: true, id: "image", error: error.image, helperText: error.image ? "Must be a valid URL" : "Image URL", value: options.image || "", onChange: handleOptionsChange }),
                    React.createElement(PaddedTextField, { label: "Video", variant: "outlined", fullWidth: true, helperText: "Video URL", id: "video", error: error.video, helperText: error.video ? "Must be a valid URL" : "Video URL", value: options.video || "", onChange: handleOptionsChange })),
                React.createElement(CustomizeButton, { type: "submit", variant: "contained", color: "primary" }, "Set Customization"))),
        React.createElement(ToastContainer, { style: { marginLeft: "8.2%" } })));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Customization.js.map