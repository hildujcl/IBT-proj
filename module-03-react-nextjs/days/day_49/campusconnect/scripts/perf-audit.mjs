const base = (process.env.PERF_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const routes = ["/", "/events", "/resources", "/announcements", "/api/events", "/api/health", "/sitemap.xml", "/robots.txt"];
let failed = false;
console.log(`CampusConnect response audit: ${base}`);
console.log("This checks HTTP status, response bytes, and server response time only; it does not measure LCP, CLS, INP, or Lighthouse scores.");
for (const route of routes) {
  const start = performance.now();
  try {
    const response = await fetch(`${base}${route}`, { redirect: "manual" });
    const body = await response.arrayBuffer();
    const ms = performance.now() - start;
    const ok = response.status >= 200 && response.status < 400;
    console.log(`${ok ? "PASS" : "FAIL"} ${String(response.status).padEnd(3)} ${route.padEnd(20)} ${(body.byteLength / 1024).toFixed(1).padStart(7)} KiB ${(ms).toFixed(1).padStart(7)} ms`);
    if (!ok) failed = true;
  } catch (error) {
    console.log(`FAIL ${route}: ${error.message}`);
    failed = true;
  }
}
if (failed) process.exitCode = 1;
