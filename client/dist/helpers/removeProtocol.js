export default function removeProtocol(host_name) {
    try {
        var url = new URL(host_name);
        var domain = url.hostname.split("www.").join("");
        return domain;
    }
    catch (_a) {
        // Send error message instead
        return host_name;
    }
}
//# sourceMappingURL=removeProtocol.js.map