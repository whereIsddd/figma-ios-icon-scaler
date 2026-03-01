"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 340, height: 480 });
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'scale-icons') {
        const selection = figma.currentPage.selection[0];
        if (!selection) {
            figma.notify("❌ Please select a single 1024×1024 source icon frame or image first.");
            return;
        }
        if (figma.currentPage.selection.length !== 1) {
            figma.notify("❌ Please select exactly one source icon node.");
            return;
        }
        const width = Math.round(selection.width);
        const height = Math.round(selection.height);
        if (width !== 1024 || height !== 1024) {
            figma.notify("❌ Source icon must be 1024×1024.");
            return;
        }
        const specs = [
            { pt: 20, scales: [2, 3], label: 'Notification' },
            { pt: 29, scales: [1, 2, 3], label: 'Settings' },
            { pt: 40, scales: [1, 2, 3], label: 'Spotlight' },
            { pt: 60, scales: [2, 3], label: 'App' },
            { pt: 76, scales: [1, 2], label: 'iPad App' },
            { pt: 83.5, scales: [2], label: 'iPad Pro' },
            { pt: 1024, scales: [1], label: 'App Store' }
        ];
        const selectedPts = Array.isArray(msg.selectedPts)
            ? msg.selectedPts
            : undefined;
        const activeSpecs = selectedPts && selectedPts.length > 0
            ? specs.filter(spec => selectedPts.includes(spec.pt))
            : specs;
        if (activeSpecs.length === 0) {
            figma.notify("ℹ️ No sizes selected. Nothing to generate.");
            return;
        }
        // Export the selected 1024×1024 icon once and reuse it as an image fill
        const imageBytes = yield selection.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: 1 }
        });
        const image = figma.createImage(imageBytes);
        let xOffset = selection.width + 50;
        const nodes = [];
        activeSpecs.forEach(spec => {
            spec.scales.forEach(m => {
                const targetSize = spec.pt * m;
                const rect = figma.createRectangle();
                rect.resize(targetSize, targetSize);
                rect.fills = [
                    {
                        type: 'IMAGE',
                        scaleMode: 'FIT',
                        imageHash: image.hash
                    }
                ];
                // Try to match the source corner radius when possible
                if ('cornerRadius' in selection && typeof selection.cornerRadius === 'number') {
                    rect.cornerRadius = selection.cornerRadius;
                }
                rect.x = selection.x + xOffset;
                rect.y = selection.y;
                rect.name = `iOS/${spec.label}_${spec.pt}pt@${m}x_${targetSize}px`;
                figma.currentPage.appendChild(rect);
                nodes.push(rect);
                xOffset += targetSize + 25;
            });
        });
        if (nodes.length > 0) {
            figma.viewport.scrollAndZoomIntoView(nodes);
            figma.notify("✅ iOS icon variants generated successfully!");
        }
    }
});
