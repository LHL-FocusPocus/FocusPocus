import "./App.css";
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Options from "./components/Options";
import { Route, useHistory } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import axios from "axios";
if (process.env.REACT_APP_API_BASE_URL) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}
else {
    axios.defaults.baseURL = "http://localhost:9000";
}
axios.defaults.withCredentials = true;
function App() {
    var _a = useApplicationData(), state = _a.state, disableBlacklistedSite = _a.disableBlacklistedSite, addBlacklistedSite = _a.addBlacklistedSite, setDashboard = _a.setDashboard, changeQuota = _a.changeQuota;
    var theme = createMuiTheme({
        typography: {
            fontFamily: "Amatic SC, sans-serif",
            fontSize: 25,
            fontWeight: "700",
        },
    });
    var history = useHistory();
    return (React.createElement("div", { className: "App" },
        React.createElement(ThemeProvider, { theme: theme },
            React.createElement(Route, { exact: true, path: ["/"], render: function () {
                    return !state.quota_today.allotment
                        ? history.push("/login")
                        : history.push("/dashboard");
                } }),
            React.createElement(Route, { exact: true, path: ["/login", "/register"], render: function () {
                    return !state.quota_today.allotment ? (React.createElement(Landing, { setDashboard: setDashboard })) : (history.push("/dashboard"));
                } }),
            React.createElement(Route, { exact: true, path: ["/logout"], render: function () { return React.createElement(Landing, { setDashboard: setDashboard }); } }),
            React.createElement(Route, { exact: true, path: "/dashboard", render: function () {
                    return state.quota_today.allotment && (React.createElement(Dashboard, { dashboardData: state, setDashboard: setDashboard }));
                } }),
            React.createElement(Route, { exact: true, path: "/options", render: function () {
                    return state.quota_today.allotment && (React.createElement(Options, { changeQuota: changeQuota, addBlacklistedSite: addBlacklistedSite, disableBlacklistedSite: disableBlacklistedSite, dashboardData: state, blacklisted: state.blacklisted, setDashboard: setDashboard }));
                } }))));
}
export default App;
//# sourceMappingURL=App.js.map