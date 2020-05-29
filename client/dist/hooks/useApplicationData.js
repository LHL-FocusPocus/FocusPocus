var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useReducer, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import reducer, { SET_DASHBOARD_DATA, CHANGE_BLACKLIST, CHANGE_QUOTA, SET_WEBSOCKET_GRAPHS, } from "../reducers/application";
var WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "http://localhost:9000";
export default function useApplicationData() {
    var _this = this;
    var _a = useReducer(reducer, {
        blacklisted: [],
        donutGraph: [],
        leaderboard: [],
        lineGraph: [],
        radialGraph: [],
        shameboard: [],
        user: {},
        quota_today: {},
    }), state = _a[0], dispatch = _a[1];
    var setDashboard = function () { return __awaiter(_this, void 0, void 0, function () {
        var userData, dashboardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("/api/data/dashboard")];
                case 1:
                    userData = _a.sent();
                    dashboardData = userData.data;
                    dispatch({
                        type: SET_DASHBOARD_DATA,
                        payload: dashboardData,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var setWebsocketGraphs = function () { return __awaiter(_this, void 0, void 0, function () {
        var userData, dashboardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("/api/data/dashboard")];
                case 1:
                    userData = _a.sent();
                    dashboardData = userData.data;
                    dispatch({
                        type: SET_WEBSOCKET_GRAPHS,
                        payload: dashboardData,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        // Websocket connection
        var conn = socketIOClient(WEBSOCKET_URL);
        conn.on("refresh", function () {
            setWebsocketGraphs();
        });
        axios
            .get("/api/data/dashboard")
            .then(function (dashboard) {
            dispatch({
                type: SET_DASHBOARD_DATA,
                payload: dashboard.data,
            });
        })
            .catch(function (e) { return console.error(e); });
    }, []);
    var disableBlacklistedSite = function (blacklists_id) {
        axios
            .put("/api/user/blacklists/disable/" + blacklists_id, blacklists_id)
            .then(function (res) {
            dispatch({
                type: CHANGE_BLACKLIST,
                id: res.data.id,
            });
        });
    };
    var changeQuota = function (quotaStart, quotaTarget, quotaIncrement) {
        return axios
            .post("/api/user/adjust_quota", {
            quotaStart: quotaStart,
            quotaTarget: quotaTarget,
            quotaIncrement: quotaIncrement,
        })
            .then(function (res) {
            dispatch({
                type: CHANGE_QUOTA,
                allotment: quotaStart,
            });
        })
            .catch(function (e) {
            console.error(e);
        });
    };
    var addBlacklistedSite = function (host_name) {
        axios
            .post("/api/user/blacklists/add", { host_name: host_name })
            .then(function (res) {
            var _a = res.data, id = _a.id, hostname = _a.hostname, name = _a.name, category = _a.category, website_id = _a.website_id, user_id = _a.user_id;
            dispatch({
                type: CHANGE_BLACKLIST,
                id: id,
                hostname: hostname,
                name: name,
                category: category,
                user_id: user_id,
                website_id: website_id,
            });
        })
            .catch(function (e) { return console.error(e); });
    };
    return {
        state: state,
        disableBlacklistedSite: disableBlacklistedSite,
        addBlacklistedSite: addBlacklistedSite,
        setDashboard: setDashboard,
        changeQuota: changeQuota,
    };
}
//# sourceMappingURL=useApplicationData.js.map