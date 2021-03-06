export default function (stdin, stdout, stderr) {
  return async (url) => {
    if (!url) return console.error("No URL given.");
    const res = await fetch(url);
    const { status, statusText } = res;
    const headers = [];
    for (let [key, value] of res.headers.entries()) {
      headers.push(`${key}: ${value}`);
    }
    const body = new TextDecoder().decode(
      new Uint8Array(await res.arrayBuffer()),
    );
    stdout.write(
      new TextEncoder().encode(
        `${status} ${statusText}\n${headers.join("\n")}\n\n${body}`,
      ),
    );
  };
}
