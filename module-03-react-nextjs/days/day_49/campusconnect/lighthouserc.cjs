module.exports = {
  ci: {
    collect: {
      url: [
        process.env.PERF_BASE_URL || "http://localhost:3000/",
        `${(process.env.PERF_BASE_URL || "http://localhost:3000").replace(/\/$/, "")}/events`,
        `${(process.env.PERF_BASE_URL || "http://localhost:3000").replace(/\/$/, "")}/resources`,
      ],
      numberOfRuns: 3,
      settings: { preset: "desktop", throttlingMethod: "simulate" },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.90 }],
        "categories:best-practices": ["warn", { minScore: 0.90 }],
        "categories:seo": ["error", { minScore: 0.90 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500, aggregationMethod: "median-run" }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1, aggregationMethod: "median-run" }],
        "interactive": ["warn", { maxNumericValue: 200, aggregationMethod: "median-run" }],
      },
    },
    upload: { target: "filesystem", outputDir: "./.lighthouseci" },
  },
};
