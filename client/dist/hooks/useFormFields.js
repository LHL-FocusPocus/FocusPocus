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
import { useState } from "react";
export default function useFormFields(initialState) {
    var _a = useState(initialState), fields = _a[0], setFields = _a[1];
    return [
        fields,
        function (event) {
            var _a;
            setFields(__assign(__assign({}, fields), (_a = {}, _a[event.target.id] = event.target.value, _a)));
        },
    ];
}
//# sourceMappingURL=useFormFields.js.map