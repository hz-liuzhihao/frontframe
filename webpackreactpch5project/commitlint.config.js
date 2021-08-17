/**
 * commit拦截配置
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "build",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "revert",
        "update",
        "merge",
      ],
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
  },
};
