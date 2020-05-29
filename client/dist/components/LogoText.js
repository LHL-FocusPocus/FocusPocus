var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 50%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 2;\n  transform: translateX(3%) translateY(5%);\n\n  @media (max-width: 1300px) {\n    transform: none;\n    margin: 2em;\n  }\n"], ["\n  height: 50%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 2;\n  transform: translateX(3%) translateY(5%);\n\n  @media (max-width: 1300px) {\n    transform: none;\n    margin: 2em;\n  }\n"])));
var ClickableLink = styled.a(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-decoration: none;\n  color: purple;\n"], ["\n  text-decoration: none;\n  color: purple;\n"])));
var Tagline = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 2em;\n  padding: 1em 0;\n  padding-top: 0.5em;\n  text-align: center;\n  font-family: \"Amatic SC\", cursive;\n  text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;\n"], ["\n  font-size: 2em;\n  padding: 1em 0;\n  padding-top: 0.5em;\n  text-align: center;\n  font-family: \"Amatic SC\", cursive;\n  text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;\n"])));
var Logo = styled.img(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 50%;\n  transform: translateY(30px) translateX(175px);\n  z-index: 5;\n\n  @media (max-width: 1300px) {\n   height: 250px;\n   transform: none;\n  }\n"], ["\n  height: 50%;\n  transform: translateY(30px) translateX(175px);\n  z-index: 5;\n\n  @media (max-width: 1300px) {\n   height: 250px;\n   transform: none;\n  }\n"])));
// const EXTENSION_URL = "https://github.com/LHL-FocusPocus/FocusPocus/releases";
var EXTENSION_URL = "https://chrome.google.com/webstore/detail/focus-pocus-extension/ognhkeempdpgnfkliplegljejeakonlg/";
export default function LogoText() {
    return (React.createElement(Container, null,
        React.createElement(ClickableLink, { href: EXTENSION_URL, target: "_blank" },
            React.createElement(Logo, { src: "/imgs/logo3.png" }),
            React.createElement(Tagline, null, "Get Focused With A Little Magic."))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=LogoText.js.map