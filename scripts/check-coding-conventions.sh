#!/usr/bin/env bash
# check-coding-conventions.sh
# Phase 9 CI guardrail: enforce formatter/linter config canonicalization.
#
# Invariant:
#   - The one allowed formatter/linter config is .prettierrc at the repo root.
#   - Any other formatter/linter config file anywhere in the tree is a violation.
#
# Covered patterns (case-insensitive):
#   .prettierrc* (any variant except the exact root .prettierrc)
#   .eslintrc*
#   .editorconfig*
#   .stylelintrc*
#   .htmlhintrc*
#   .jshintrc*
#   .jslintrc*
#   prettier.config.*
#   eslint.config.*
set -euo pipefail

CANONICAL=".prettierrc"
ERROR=0

# Helper: normalise a raw find path → lowercase, strip leading ./
normalise() {
    local p="${1#./}"
    printf '%s' "$p" | tr '[:upper:]' '[:lower:]'
}

check_pattern() {
    local pattern="$1"
    while IFS= read -r -d '' file; do
        local norm
        norm=$(normalise "$file")
        # Allow only the exact root canonical file
        if [[ "$norm" != "$CANONICAL" ]]; then
            echo "ERROR: Non-canonical formatter/linter config found: ${file#./}"
            ERROR=1
        fi
    done < <(find . -not -path "./.git/*" -iname "$pattern" -print0)
}

check_pattern ".prettierrc*"
check_pattern ".eslintrc*"
check_pattern ".editorconfig*"
check_pattern ".stylelintrc*"
check_pattern ".htmlhintrc*"
check_pattern ".jshintrc*"
check_pattern ".jslintrc*"
check_pattern "prettier.config.*"
check_pattern "eslint.config.*"

if [[ $ERROR -ne 0 ]]; then
    echo ""
    echo "Only one formatter/linter config is permitted: $CANONICAL at the repo root."
    echo "Remove or consolidate any additional configs listed above."
    exit 1
fi

echo "OK: Coding conventions invariant satisfied (single canonical config: $CANONICAL)"
