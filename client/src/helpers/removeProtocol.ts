export default function removeProtocol(host_name: string) {
  try {
    const url = new URL(host_name);
    const domain = url.hostname.split("www.").join("");
    return domain;
  } catch {
    // Send error message instead
    return host_name;
  }
}
