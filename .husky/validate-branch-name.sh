#!/bin/bash

# Get the current branch name
branch=$(git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3-)

# Define valid branch name pattern
# Allowed formats:
# - feature/description
# - fix/description
# - hotfix/description
# - release/version
# - chore/description
# - docs/description
# - refactor/description
# - test/description
# - perf/description
# - ci/description
# - main or master
# - develop or dev

valid_branch_regex="^(feature|fix|hotfix|release|chore|docs|refactor|test|perf|ci)\/[a-z0-9._-]+$|^(main|master|develop|dev)$"

if ! [[ $branch =~ $valid_branch_regex ]]; then
    echo "❌ Invalid branch name: '$branch'"
    echo ""
    echo "Branch names must follow this format:"
    echo "  <type>/<description>"
    echo ""
    echo "Valid types:"
    echo "  - feature/    New features"
    echo "  - fix/        Bug fixes"
    echo "  - hotfix/     Critical fixes"
    echo "  - release/    Release preparation"
    echo "  - chore/      Maintenance tasks"
    echo "  - docs/       Documentation"
    echo "  - refactor/   Code refactoring"
    echo "  - test/       Test additions/updates"
    echo "  - perf/       Performance improvements"
    echo "  - ci/         CI/CD changes"
    echo ""
    echo "Protected branches: main, master, develop, dev"
    echo ""
    echo "Examples:"
    echo "  ✅ feature/user-authentication"
    echo "  ✅ fix/login-redirect-bug"
    echo "  ✅ hotfix/security-patch"
    echo "  ✅ docs/update-readme"
    echo ""
    echo "Your branch: ❌ $branch"
    echo ""
    exit 1
fi
