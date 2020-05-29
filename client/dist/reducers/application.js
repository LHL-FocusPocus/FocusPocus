var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export var SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export var CHANGE_BLACKLIST = "CHANGE_BLACKLIST";
export var CHANGE_QUOTA = "CHANGE_QUOTA";
export var SET_WEBSOCKET_GRAPHS = "SET_WEBSOCKET_GRAPHS";
export default function reducer(state, action) {
    switch (action.type) {
        case SET_DASHBOARD_DATA:
            // If user has not adjusted their increment or target, set default values here to allow page to load
            if (action.payload.user.options === null) {
                return __assign(__assign(__assign({}, state), action.payload), { user: __assign(__assign({}, action.payload.user), { options: {
                            quotaIncrement: 5,
                            quotaTarget: 60,
                        } }) });
            }
            else {
                return __assign(__assign({}, state), action.payload);
            }
        case CHANGE_BLACKLIST:
            var id_1 = action.id;
            var clonedBlacklist = __spreadArrays(state.blacklisted);
            // If hostname is truthy, then the blacklisted site is being added instead of deleted
            if (action.hostname) {
                var hostname = action.hostname, name_1 = action.name, category = action.category, website_id = action.website_id, user_id = action.user_id;
                var newBlacklistedSite = {
                    blacklists_id: id_1,
                    hostname: hostname,
                    name: name_1,
                    category: category,
                    website_id: website_id,
                    user_id: user_id,
                };
                clonedBlacklist.unshift(newBlacklistedSite);
            }
            else {
                // Find index where the blacklisted site lives
                var siteIndex = state.blacklisted.indexOf(state.blacklisted.find(function (site) { return site.blacklists_id === id_1; }));
                clonedBlacklist.splice(siteIndex, 1);
            }
            return __assign(__assign({}, state), { blacklisted: clonedBlacklist });
        case CHANGE_QUOTA:
            var _a = state.quota_today, used = _a.used, all_browse_time = _a.all_browse_time;
            var newQuota = {
                minutes: action.allotment,
            };
            var quotaData = {
                allotment: newQuota,
                used: {
                    minutes: used.minutes,
                },
                all_browse_time: {
                    minutes: all_browse_time.minutes,
                },
            };
            return __assign(__assign({}, state), { quota_today: quotaData });
        case SET_WEBSOCKET_GRAPHS:
            var _b = action.payload, quota_today = _b.quota_today, donutGraph = _b.donutGraph, radialGraph = _b.radialGraph;
            return __assign(__assign({}, state), { quota_today: quota_today,
                donutGraph: donutGraph,
                radialGraph: radialGraph });
        default:
            throw new Error("Tried to reduce with unsupported action type: " + action.type);
    }
}
//# sourceMappingURL=application.js.map