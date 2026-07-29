# Asset Mapping Specification for H5 Canvas 2D Engine

This reference details exact path conventions for mapping assets in `config.js` and Canvas 2D render loops.

## 1. Character Class Art Mapping
- **Config Key**: `PROF_BASE[classKey]` or `CLASSES[classKey]`
- **Target Path**: `art-app/assets/<classKey>_front.png`
- **Fallback**: SVG canvas rendering or standard avatar box if file missing.

## 2. Weapon Asset Mapping
- **Config Key**: `WEAPON_TYPES[typeKey]`
- **Target Primary Path**: `assets/weapons/<typeKey>.png`
- **Target Fallback Path**: `art-assets/gpu-gen/equipment-icons/weapon_<typeKey>.png`
- **Render Function**: `getEquipmentIconHTML(item, size)` in `js/config.js`

## 3. Skill Icon Mapping
- **Config Key**: `SKILL_DEFS[skillId].img` or `SKILLS[idx].img`
- **Target Path**: `art-app/assets/icon_<skillId>.png`

## 4. UI & Equipment Icon Mapping
- **Slot Icons**: `art-assets/gpu-gen/equipment-icons/<slotKey>.png` (where `slotKey` = weapon, armor, helmet, ring, etc.)
