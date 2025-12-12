#!/bin/bash

echo "🧹 CLEANING UP REPOSITORY..."
echo "════════════════════════════════════════"

# Backup important docs first
mkdir -p _docs_keep
cp README.md _docs_keep/ 2>/dev/null || true
cp DEPLOYMENT_SUCCESS_REPORT.md _docs_keep/ 2>/dev/null || true
cp RINGKASAN_FINAL.md _docs_keep/ 2>/dev/null || true

# Count files before cleanup
echo ""
echo "📊 BEFORE CLEANUP:"
find . -name "*.md" -type f | grep -v node_modules | grep -v .git | wc -l | xargs echo "  - Markdown files:"
du -sh . | awk '{print "  - Total size: " $1}'

# Remove unnecessary documentation
echo ""
echo "🗑️  REMOVING BLOAT..."

# Remove all .md files except the ones we keep
find . -name "*.md" -type f \
  ! -path "./node_modules/*" \
  ! -path "./.git/*" \
  ! -path "./_docs_keep/*" \
  ! -name "README.md" \
  -delete

# Remove log files
find . -name "*.log" -type f ! -path "./node_modules/*" -delete

# Remove test scripts that are no longer needed
rm -f test-*.js deploy-*.sh check-*.js 2>/dev/null || true

# Count after cleanup
echo ""
echo "📊 AFTER CLEANUP:"
find . -name "*.md" -type f | grep -v node_modules | grep -v .git | wc -l | xargs echo "  - Markdown files:"
du -sh . | awk '{print "  - Total size: " $1}'

echo ""
echo "✅ CLEANUP COMPLETE!"
