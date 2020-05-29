var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import styled from "styled-components";
import { Paper, Box } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LineGraph from "./Graphs/LineGraph";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Navbar from "./Navbar";
import Donut from "./Graphs/Donut";
import Radial from "./Graphs/Radial";
import Leaderboard from "./Graphs/Leaderboard";
import Shameboard from "./Graphs/Shameboard";
var Container = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 5em;\n  height: 100%;\n"], ["\n  padding: 5em;\n  height: 100%;\n"])));
var Wrapper = styled(Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1 100%;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  height: 500px;\n  padding-right: 3%;\n  margin-bottom: 3em;\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    order: 5;\n    padding-right: 0\n  }\n"], ["\n  flex: 1 100%;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  height: 500px;\n  padding-right: 3%;\n  margin-bottom: 3em;\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    order: 5;\n    padding-right: 0\n  }\n"])));
export default function Dashboard(_a) {
    var dashboardData = _a.dashboardData, setDashboard = _a.setDashboard;
    var donutGraph = dashboardData.donutGraph, lineGraph = dashboardData.lineGraph, radialGraph = dashboardData.radialGraph, leaderboard = dashboardData.leaderboard, shameboard = dashboardData.shameboard, user = dashboardData.user, quota_today = dashboardData.quota_today;
    var isOverQuota = function () {
        return quota_today.used.minutes > quota_today.allotment.minutes;
    };
    // Create popup error if user is over quota for today
    useEffect(function () {
        toast("⚠️ You are over your quota! ⚠️", {
            containerId: "quota",
        });
    }, []);
    return (React.createElement("div", null,
        isOverQuota() && (React.createElement(ToastContainer, { style: {
                marginTop: "4%",
                width: "400px",
                fontSize: "30px",
                textAlign: "center",
                display: "inline-block",
            }, position: "top-center", autoClose: 5000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, draggable: true, containerId: "quota" })),
        React.createElement(Navbar, { user: user, quota: quota_today, setDashboard: setDashboard }),
        React.createElement(Container, { flexWrap: "wrap", display: "flex" },
            React.createElement(DailyQuotaUsed, { quota: quota_today }),
            React.createElement(LineGraph, { lineData: lineGraph }),
            React.createElement(Paper, { component: Wrapper, elevation: 24 },
                React.createElement(Leaderboard, { leaderboard: leaderboard }),
                React.createElement(Shameboard, { shameboard: shameboard })),
            React.createElement(Donut, { donutData: donutGraph }),
            React.createElement(Radial, { radialData: radialGraph }))));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=Dashboard.js.map