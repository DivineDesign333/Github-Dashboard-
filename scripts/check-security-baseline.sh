#!/usr/bin/env bash
# check-security-baseline.sh
# Phase 9 CI guardrail: enforce canonical SECURITY.md placement and README linkage.
#
# Invariants:
#   1. governance/SECURITY.md must exist.
#   2. README.md must contain a link to governance/SECURITY.md.
#   3. No additional SECURITY*.md files may exist outside governance/.
set -euo pipefail

CANONICAL="governance/SECURITY.md"
README="README.md"
ERROR=0

# 1. Canonical file must exist
if [[ ! -f "$CANONICAL" ]]; then
    echo "ERROR: Canonical security policy not found: $CANONICAL"
    ERROR=1
fi

# 2. README must link to governance/SECURITY.md
if [[ ! -f "$README" ]]; then
    echo "ERROR: $README not found"
    ERROR=1
elif ! grep -qiF "governance/SECURITY.md" "$README"; then
    echo "ERROR: $README does not contain a link to $CANONICAL"
    ERROR=1
fi

# 3. No SECURITY*.md outside governance/
while IFS= read -r -d '' file; do
    normalised="${file#./}"
    lower=$(printf '%s' "$normalised" | tr '[:upper:]' '[:lower:]')
    if [[ "$lower" != "governance/security.md" ]]; then
        echo "ERROR: SECURITY*.md found outside governance/: $normalised"
        ERROR=1
    fi
done < <(find . -not -path "./.git/*" -iname "security*.md" -print0)

if [[ $ERROR -ne 0 ]]; then
    echo ""
    echo "Security baseline invariant violated. Required:"
    echo "  - $CANONICAL must exist"
    echo "  - $README must link to $CANONICAL"
    echo "  - No SECURITY*.md files may exist outside governance/"
    exit 1
fi

echo "OK: Security baseline invariant satisfied (canonical: $CANONICAL)"
