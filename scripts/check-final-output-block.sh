#!/usr/bin/env bash
# check-final-output-block.sh
# CI guardrail: fail if any final-output-block*.md file exists outside governance/.
set -euo pipefail

CANONICAL="governance/final-output-block.md"
ERROR=0

# Find any final-output-block*.md files (case-insensitive) that are NOT in governance/
while IFS= read -r -d '' file; do
    # Normalize path (strip leading ./) then convert to lowercase for comparison
    normalised="${file#./}"
    lower=$(printf '%s' "$normalised" | tr '[:upper:]' '[:lower:]')
    if [[ "$lower" != "governance/final-output-block"*.md ]]; then
        echo "ERROR: Duplicate Final Output Block standard found outside governance/: $normalised"
        ERROR=1
    fi
done < <(find . -iname "final-output-block*.md" -not -path "./.git/*" -print0)

if [[ $ERROR -ne 0 ]]; then
    echo ""
    echo "The Final Output Block standard must live exclusively in $CANONICAL."
    echo "Remove any copies found above and, if needed, update $CANONICAL instead."
    exit 1
fi

echo "OK: Final Output Block standard is canonical at $CANONICAL"
