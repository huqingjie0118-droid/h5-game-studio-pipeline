# Asset Generation Spec (via agnes-ai)

Guidance for automated image generation using the `agnes-ai` skill (`docs/免费文生图.md` protocol).

## Model Specification
- **Engine**: `agnes-ai`
- **Model Target**: `agnes-image-2.1-flash` (or Z-Image-Turbo local GPUStack endpoint)
- **Endpoint**: `https://apihub.agnes-ai.cn/v1/images/generations`

## Prompting Conventions
- **Character Art**: `"[Class Name] standing pose, pixel art style, dark fantasy game character, transparent background, clean outline, 512x512"`
- **Weapon Icon**: `"[Weapon Type], game weapon icon, isolated on black background, glowing aura, high detail, 512x512"`
- **Skill Icon**: `"[Magic Element] spell icon, circular game skill badge, vibrant magic effect, dark background, 256x256"`

## Post-Processing
Run `python tools/make_transparent.py --input <path>` to remove solid backgrounds and generate smooth PNG alpha transparency.
