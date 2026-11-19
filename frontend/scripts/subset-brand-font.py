"""Optional asset tool: requires FontTools 4.60.2 and Brotli 1.2.1."""

import json
from pathlib import Path
from tempfile import NamedTemporaryFile

from fontTools import subset
from fontTools.pens.recordingPen import RecordingPen
from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import WOFF2FlavorData


def main():
    directory = Path(__file__).resolve().parents[1] / "public" / "font"
    source = directory / "StormWraithPersonalUse-aYd8g.ttf"
    output = directory / "storm-wraith-brand.woff2"
    text = "Grand Sapphire Resorts"
    options = subset.Options()
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.name_legacy = True
    options.glyph_names = True
    options.layout_features = ["*"]
    options.notdef_outline = True
    options.recommended_glyphs = True
    options.recalc_bounds = False

    # Preserve original bounds; default normalization moves some outlines by one unit.
    original = TTFont(source, recalcTimestamp=False, recalcBBoxes=False)
    font = TTFont(source, recalcTimestamp=False, recalcBBoxes=False)
    worker = subset.Subsetter(options=options)
    worker.populate(text=text)
    worker.subset(font)
    font.flavor = "woff2"
    font.flavorData = WOFF2FlavorData(transformedTables=set())
    with NamedTemporaryFile(dir=directory, prefix=".storm-wraith-", suffix=".woff2", delete=False) as handle:
        temporary = Path(handle.name)
    try:
        font.save(temporary)
        result = TTFont(temporary)
        for name, glyph in result.getGlyphSet().items():
            before, after = RecordingPen(), RecordingPen()
            original.getGlyphSet()[name].draw(before)
            glyph.draw(after)
            if before.value != after.value or original["hmtx"][name] != result["hmtx"][name]:
                raise ValueError(f"Glyph outline or advance changed: {name}")
        def names(item):
            return {(n.nameID, n.platformID, n.platEncID, n.langID, n.toBytes()) for n in item["name"].names}
        if names(original) != names(result):
            raise ValueError("Font name, copyright or license records changed")
        if not all(ord(character) in result.getBestCmap() for character in set(text)):
            raise ValueError("Brand characters are missing")
        result.close()
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)
    print(json.dumps({"source_bytes": source.stat().st_size, "woff2_bytes": output.stat().st_size, "glyphs_checked": len(font.getGlyphSet())}))


if __name__ == "__main__":
    main()
