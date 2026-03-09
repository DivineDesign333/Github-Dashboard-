#!/usr/bin/env bash
# check-repo-layout.sh
# Phase 9 CI guardrail: enforce top-level directory and file governance.
#
# Canonical allowed top-level directories:
#   governance/, src/, docs/, scripts/, ci/, .github/
#
# Canonical allowed root files:
#   README.md, LICENSE, CONTRIBUTING.md, .gitignore
#   (SECURITY.md lives under governance/ — see check-security-baseline.sh)
#
# Baseline items present in the repo before this invariant was introduced are
# also permitted so that CI passes immediately; they are tracked here for
# visibility and future clean-up.
set -euo pipefail

# Canonical governance-approved top-level directories (lowercase)
CANONICAL_DIRS=(
    "governance"
    "src"
    "docs"
    "scripts"
    "ci"
    ".github"
)

# Canonical governance-approved root files (lowercase)
CANONICAL_FILES=(
    "readme.md"
    "license"
    "contributing.md"
    ".gitignore"
)

# Baseline: top-level directories that pre-date this invariant.
# These are permitted until a dedicated clean-up PR migrates them
# under a canonical location.
BASELINE_DIRS=(
    "js"
    "styles"
    "consolidation-artifacts"
)

# Baseline: root files that pre-date this invariant.
BASELINE_FILES=(
    "changelog.md"
    "config.js"
    "index.html"
    "requirements.txt"
)

# Build lookup sets (bash doesn't have sets, so use associative arrays)
declare -A ALLOWED_DIRS
for d in "${CANONICAL_DIRS[@]}" "${BASELINE_DIRS[@]}"; do
    ALLOWED_DIRS["$d"]=1
done

declare -A ALLOWED_FILES
for f in "${CANONICAL_FILES[@]}" "${BASELINE_FILES[@]}"; do
    ALLOWED_FILES["$f"]=1
done

ERROR=0

# Check every top-level entry (excluding .git itself)
while IFS= read -r -d '' entry; do
    name="${entry#./}"
    # Skip .git directory
    [[ "$name" == ".git" ]] && continue

    lower=$(printf '%s' "$name" | tr '[:upper:]' '[:lower:]')

    if [[ -d "$entry" ]]; then
        if [[ -z "${ALLOWED_DIRS[$lower]+_}" ]]; then
            echo "ERROR: Non-canonical top-level directory: $name"
            ERROR=1
        fi
    else
        if [[ -z "${ALLOWED_FILES[$lower]+_}" ]]; then
            echo "ERROR: Non-canonical root file: $name"
            ERROR=1
        fi
    fi
done < <(find . -maxdepth 1 -not -path "." -print0)

if [[ $ERROR -ne 0 ]]; then
    echo ""
    echo "All root-level directories must be one of: ${CANONICAL_DIRS[*]}"
    echo "All root-level files must be one of: ${CANONICAL_FILES[*]}"
    echo "Remove or relocate any non-canonical items listed above."
    exit 1
fi

echo "OK: Repository layout invariant satisfied"
