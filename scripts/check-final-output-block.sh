#!/usr/bin/env bash
# check-final-output-block.sh
# CI guardrail: fail if any final-output-block*.md file exists outside governance/.
set -euo pipefail

CANONICAL="governance/final-output-block.md"
ERROR=0

# Find any final-output-block*.md files that are NOT in governance/
while IFS= read -r -d '' file; do
    # Normalize path (strip leading ./)
    normalised="${file#./}"
    if [[ "$normalised" != "governance/final-output-block"*.md ]]; then
        echo "ERROR: Duplicate Final Output Block standard found outside governance/: $normalised"
        ERROR=1
    fi
done < <(find . -name "final-output-block*.md" -not -path "./.git/*" -print0)

if [[ $ERROR -ne 0 ]]; then
    echo ""
    echo "The Final Output Block standard must live exclusively in $CANONICAL."
    echo "Remove any copies found above and, if needed, update $CANONICAL instead."
    exit 1
fi

echo "OK: Final Output Block standard is canonical at $CANONICAL"
