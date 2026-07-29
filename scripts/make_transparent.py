#!/usr/bin/env python3
"""
scripts/make_transparent.py
Automated image background transparency script for AI-generated game assets.
Removes solid black/white background colors and applies smooth alpha thresholding.

Requirements: Pillow  (install with `pip install Pillow`)
"""

import sys
import os
from PIL import Image

def process_transparency(image_path, bg_color='black', threshold=30):
    if not os.path.exists(image_path):
        print(f"Error: File not found: {image_path}")
        return False

    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        if bg_color == 'black':
            if r < threshold and g < threshold and b < threshold:
                new_data.append((r, g, b, 0))
            else:
                new_data.append((r, g, b, a))
        elif bg_color == 'white':
            if r > 255 - threshold and g > 255 - threshold and b > 255 - threshold:
                new_data.append((r, g, b, 0))
            else:
                new_data.append((r, g, b, a))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(image_path, "PNG")
    print(f"✓ Applied alpha transparency to: {image_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python make_transparent.py <image_path> [black|white] [threshold]")
        sys.exit(1)

    path = sys.argv[1]
    bg = sys.argv[2] if len(sys.argv) > 2 else 'black'
    thresh = int(sys.argv[3]) if len(sys.argv) > 3 else 30

    process_transparency(path, bg, thresh)
