## iOS app icon size scaling

TypeScript-based Figma plugin that scales a 1024×1024 source icon into common iOS app icon sizes.

### Features

- **Manifest v3-style setup**: Uses a `manifest.json` with `main` and `ui` entry points.
- **TypeScript**: Source in `src/`, compiled to `dist/`.
- **Icon scaler**: Takes a 1024×1024 source icon and clones/scales it for:
  - 20pt (2×, 3×)
  - 29pt (1×, 2×, 3×)
  - 40pt (1×, 2×, 3×)
  - 60pt (2×, 3×)
  - 76pt (1×, 2×)
  - 83.5pt (2×)
  - 1024pt (1×)

### Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Build the plugin**

   ```bash
   npm run build
   ```

   This compiles `src/code.ts` and `src/ui.ts` into `dist/code.js` and `dist/ui.js`.

3. **Link in Figma**

   - In Figma, go to **Plugins → Development → Import plugin from manifest…**
   - Select the `manifest.json` file in this folder.

4. **Use the plugin**

   - Run the plugin from **Plugins → Development**.
   - In the UI, click **Generate icons**.
   - The plugin will create an `iOS App Icons` frame on the current page containing frames at all the requested sizes.

