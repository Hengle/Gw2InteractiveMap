import { Vector2, MapInfo } from '@/react-app-env';
import { getTranslation, v2add, v2scale, vector2 } from '@/logic/vector2';

export function canvasToWorld(vector: Vector2, centerWorldPos: Vector2, canvasSize: Vector2, mapInfo: MapInfo, zoom: number): Vector2 {
    const tileScale = getTileScale(zoom, mapInfo.maxZoom);
    const centerFloatCanvasPos = vector2(canvasSize.x / 2, canvasSize.y / 2);
    const centerFloatWorldPos = v2scale(centerFloatCanvasPos, tileScale, tileScale);
    const centerWorldOffset = getTranslation(centerFloatWorldPos, centerWorldPos);
    const floatWorldPos = v2scale(vector, tileScale, tileScale);
    const worldPos = v2add(floatWorldPos, centerWorldOffset);
    return worldPos;
}

export function worldToCanvas(vector: Vector2, centerWorldPos: Vector2, canvasSize: Vector2, mapInfo: MapInfo, zoom: number): Vector2 {
    const tileScale = getTileScale(zoom, mapInfo.maxZoom);
    const tileScaleInv = 1 / tileScale;
    const centerFloatCanvasPos = vector2(canvasSize.x / 2, canvasSize.y / 2);
    const centerCanvasPos = v2scale(centerWorldPos, tileScaleInv, tileScaleInv);
    const centerCanvasOffset = getTranslation(centerCanvasPos, centerFloatCanvasPos);
    const worldPos = v2scale(vector, tileScaleInv, tileScaleInv);
    const canvasPos = v2add(worldPos, centerCanvasOffset);
    return canvasPos;
}

export function getTileScale(zoom: number, maxZoom: number): number {
    return 2 ** (maxZoom - zoom);
}

export function getRenderScale(zoom: number, minZoom: number, maxZoom: number): number {
    const tileZoom = Math.max(minZoom, Math.min(maxZoom, Math.ceil(zoom)));
    return 2 ** (zoom - tileZoom);
}

export function getPixelWorldSize(zoom: number, minZoom: number, maxZoom: number): number {
    return getTileScale(zoom, maxZoom) * getRenderScale(zoom, minZoom, maxZoom);
}

export function getDimensions(canvasWorldSize: Vector2, tileSize: Vector2): Vector2 {
    const x = Math.ceil(canvasWorldSize.x / tileSize.x / 2) * 2 + 1;
    const y = Math.ceil(canvasWorldSize.y / tileSize.y / 2) * 2 + 1;
    return vector2(x, y);
}