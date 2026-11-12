# Homepage asset provenance — M1.3

## Photography

The M1 front-facing white-helmet portrait is no longer rendered. Its file is retained as an unused historical asset; it is not a fallback for the redesigned hero.

The current hero uses `public/images/prosafe-hero-worker.png`, the custom PROSAFE campaign photograph supplied by the user for M1.2 (1536 × 1024). It replaces the SVG placeholder and its pending-asset label. No third-party campaign photo was downloaded.

The original PNG is retained unchanged. Next.js Image serves responsive optimized variants and preloads the hero. A proportional cover crop keeps the orange helmet, face, and safety glasses in view. CSS blends near-black tones into the existing charcoal background and feathers the photograph's outer edges; there are no color filters, simulated lighting, or changes to the source pixels. Responsive source sizing accounts for the landscape image being cropped into a portrait-shaped slot.

Original PNG SHA-256: `3a66ee778dbba5db24c8ff96796644d39d0ac2098f51322388bf73bde4ac9430`.

The following photographs belonged to the mosaic removed in M1.3. They are retained as historical source assets, with no remaining application imports or image requests:

| File                                     | Photographer  | Source                                                                                 |
| ---------------------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `public/images/protection-equipment.jpg` | Kindel Media  | https://www.pexels.com/photo/close-up-of-ppe-8487733/                                  |
| `public/images/industrial-tread.jpg`     | Nothing Ahead | https://www.pexels.com/photo/textured-background-of-metal-surface-with-bulges-6800721/ |

License: https://www.pexels.com/license/ (reviewed November 12, 2026). Permits website use and cropping; prohibits implying endorsement. The equipment photo is an illustrative category study, not a product offer. Any marks visible in the stock photograph do not indicate a manufacturer relationship. Credits appear in the footer.

The original SVG grip-pattern tile was removed with its mosaic component in M1.3. The supplied reference screenshot is not used as a website asset.

## Typography

Both families are self-hosted through `next/font/local` with `display: swap`; there are no runtime or build-time font downloads.

- **Barlow Condensed Bold (700)** by Jeremy Tribby / The Barlow Project Authors. Source: https://github.com/google/fonts/tree/main/ofl/barlowcondensed. License retained at `src/assets/fonts/BarlowCondensed-OFL.txt`.
- **Manrope Variable (200–800)** by The Manrope Project Authors. Source: https://github.com/google/fonts/tree/main/ofl/manrope. License retained at `src/assets/fonts/Manrope-OFL.txt`.
- Both are distributed under SIL Open Font License 1.1. Original font files and license notices are retained without modification.

The redesigned hero uses **Manrope 200**, with regular/light Manrope for its editorial information panels. Barlow Condensed remains in the existing PROSAFE wordmark and untouched lower homepage sections. System monospace handles technical labels. No font package or download was added for M1.1.
