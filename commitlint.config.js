/**
 * Commitlint Configuration
 * Enforces conventional commit messages
 * @see https://commitlint.js.org
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type enum - allowed commit types
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation changes
        "style", // Code style changes (formatting, etc)
        "refactor", // Code refactoring
        "perf", // Performance improvements
        "test", // Adding or updating tests
        "build", // Build system or dependency changes
        "ci", // CI/CD changes
        "chore", // Other changes (maintenance, etc)
        "revert", // Revert a previous commit
      ],
    ],
    // Subject case - allow any case
    "subject-case": [0],
    // Subject max length
    "subject-max-length": [2, "always", 100],
    // Body max line length
    "body-max-line-length": [2, "always", 100],
    // Footer max line length
    "footer-max-line-length": [2, "always", 100],
  },
};
