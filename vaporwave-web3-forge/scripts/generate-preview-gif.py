from __future__ import annotations

from pathlib import Path
import math

from PIL import Image, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "media" / "how-to-use.gif"
W, H = 960, 540
FRAMES = 44

SCREENCLIP_DIR = Path(
    r"C:\Users\thiag\AppData\Local\Packages\MicrosoftWindows.Client.Core_cw5n1h2txyewy\TempState\ScreenClip"
)


def latest_source() -> Path:
    if SCREENCLIP_DIR.exists():
        pngs = sorted(SCREENCLIP_DIR.glob("*.png"), key=lambda p: p.stat().st_mtime, reverse=True)
        if pngs:
            return pngs[0]
    return ROOT / "media" / "icon.png"


def make_bg(t: float) -> Image.Image:
    img = Image.new("RGB", (W, H), (8, 12, 28))
    draw = ImageDraw.Draw(img)

    for y in range(H):
        p = y / max(H - 1, 1)
        r = int(6 + 12 * p)
        g = int(10 + 20 * p)
        b = int(24 + 38 * p)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    cx = int(W * (0.72 + 0.015 * math.sin(t * math.tau)))
    cy = int(H * (0.58 + 0.018 * math.cos(t * math.tau)))
    gdraw.ellipse((cx - 280, cy - 280, cx + 280, cy + 280), fill=(40, 108, 255, 62))
    gdraw.ellipse((cx - 160, cy - 160, cx + 160, cy + 160), fill=(88, 172, 255, 78))
    gdraw.ellipse((cx - 84, cy - 84, cx + 84, cy + 84), fill=(145, 210, 255, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(20))
    return Image.alpha_composite(img.convert("RGBA"), glow)


def fit_cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return ImageOps.fit(image, size, method=Image.Resampling.LANCZOS)


def add_screen(frame: Image.Image, source: Image.Image, t: float) -> None:
    frame_rgba = frame.convert("RGBA")

    panel_w = int(W * 0.74)
    panel_h = int(H * 0.88)
    px = (W - panel_w) // 2
    py = (H - panel_h) // 2

    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle((px + 10, py + 14, px + panel_w + 10, py + panel_h + 14), radius=24, fill=(0, 0, 0, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    frame_rgba.alpha_composite(shadow)

    tilt = 1.0 + 0.004 * math.sin(t * math.tau)
    inner_w = int((panel_w - 16) * tilt)
    inner_h = int((panel_h - 16) * tilt)

    screen = fit_cover(source, (inner_w, inner_h)).convert("RGBA")
    mask = Image.new("L", (inner_w, inner_h), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle((0, 0, inner_w - 1, inner_h - 1), radius=18, fill=255)
    screen.putalpha(mask)

    panel = Image.new("RGBA", (panel_w, panel_h), (10, 20, 44, 236))
    pdraw = ImageDraw.Draw(panel)
    pdraw.rounded_rectangle((0, 0, panel_w - 1, panel_h - 1), radius=22, outline=(104, 142, 212, 180), width=2)
    panel.alpha_composite(screen, ((panel_w - inner_w) // 2, (panel_h - inner_h) // 2))

    shine = Image.new("RGBA", (panel_w, panel_h), (0, 0, 0, 0))
    shdraw = ImageDraw.Draw(shine)
    sweep = int((t % 1.0) * (panel_w + 220)) - 110
    shdraw.polygon(
        [(sweep - 120, -10), (sweep - 20, -10), (sweep + 140, panel_h + 10), (sweep + 40, panel_h + 10)],
        fill=(255, 255, 255, 24),
    )
    shine = shine.filter(ImageFilter.GaussianBlur(6))
    panel.alpha_composite(shine)

    frame_rgba.alpha_composite(panel, (px, py))
    frame.paste(frame_rgba)


def build() -> None:
    source_path = latest_source()
    source = Image.open(source_path).convert("RGB")

    frames: list[Image.Image] = []
    for i in range(FRAMES):
        t = i / FRAMES
        bg = make_bg(t)
        add_screen(bg, source, t)
        frames.append(bg.convert("P", palette=Image.Palette.ADAPTIVE, colors=255))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        OUTPUT,
        save_all=True,
        append_images=frames[1:],
        optimize=False,
        duration=72,
        loop=0,
        disposal=2,
    )


if __name__ == "__main__":
    build()
