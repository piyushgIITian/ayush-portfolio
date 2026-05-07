#!/usr/bin/env bash
# Renders Ayush_Kapil_CV.yaml and inlines the T.S. Chanakya logo into the PDF.
set -euo pipefail

cd "$(dirname "$0")"
source venv/bin/activate

rendercv render Ayush_Kapil_CV.yaml

OUT=rendercv_output
cp -f ts-chanakya-logo.png "$OUT/"

# Inject logo image inline before the T.S. Chanakya institution name in the Typst source.
python - <<'PY'
from pathlib import Path
typ = Path("rendercv_output/Ayush_Kapil_CV.typ")
src = typ.read_text()
needle = "#strong[T.S. Chanakya, Indian Maritime University (IMU)]"
replacement = (
    '#box(image("ts-chanakya-logo.png", height: 1em), baseline: 0.15em) '
    "#strong[T.S. Chanakya, Indian Maritime University (IMU)]"
)
if replacement not in src:
    src = src.replace(needle, replacement, 1)
    typ.write_text(src)
PY

# Recompile PDF from the patched Typst.
python -c "import typst; typst.compile('rendercv_output/Ayush_Kapil_CV.typ', output='rendercv_output/Ayush_Kapil_CV.pdf')"

# Mirror the latest PDF into the website's public/ so /Ayush_Kapil_CV.pdf serves it.
cp -f rendercv_output/Ayush_Kapil_CV.pdf public/Ayush_Kapil_CV.pdf

echo "Done -> rendercv_output/Ayush_Kapil_CV.pdf (also copied to public/)"
