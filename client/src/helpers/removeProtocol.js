export default async function removeProtocol(host_name) {
  try {
    const url = new URL(host_name);
    const domain = url.hostname.split("www.").join("");
    return domain;
  } catch {
    return host_name;
  }
}
