/**
 * Slidevテーマ用の海テーマ設定
 */

export interface WaveColors {
  shallow: string;      // 浅瀬の色
  medium: string;       // 中間の深さの色
  deep: string;         // 深海の色
  background: string;   // 背景色
  rendererBg: number;   // Three.jsレンダラーの背景色
}

export interface WaveEffects {
  sparkleIntensity: number;      // キラキラ効果の強度
  glintIntensity: number;         // 光沢の強度
  causticsIntensity: number;      // コースティクス（水底の光の模様）の強度
  foamIntensity: number;          // 泡の強度
  fresnelStrength: number;        // フレネル反射の強度
  brightnessMultiplier: number;   // 明度の倍率
  saturation: number;             // 彩度
}

export interface WaveSettings {
  colors: WaveColors;             // 色設定
  effects: WaveEffects;          // エフェクト設定
  waveStrength: number;          // 波の強さ
  opacity: number;               // 不透明度
  animationSpeed: number;        // アニメーション速度
}

export type WaveTheme = "tropical" | "natural" | "deep";

export const WAVE_THEMES: Record<WaveTheme, WaveSettings> = {
  tropical: {
    colors: {
      shallow: "#99e8ff",
      medium: "#66ccff",
      deep: "#3399ff",
      background: "#00d9ff",
      rendererBg: 0x00d9ff,
    },
    effects: {
      sparkleIntensity: 6.0,
      glintIntensity: 10.0,
      causticsIntensity: 0.8,
      foamIntensity: 0.25,
      fresnelStrength: 0.7,
      brightnessMultiplier: 1.7,
      saturation: 1.3,
    },
    waveStrength: 1.5,
    opacity: 0.95,
    animationSpeed: 0.008,
  },
  natural: {
    colors: {
      shallow: "#4DB8DA",
      medium: "#3A9BC1",
      deep: "#2E7BA6",
      background: "#3838ff",
      rendererBg: 0x3838ff,
    },
    effects: {
      sparkleIntensity: 4.0,
      glintIntensity: 6.0,
      causticsIntensity: 0.6,
      foamIntensity: 0.15,
      fresnelStrength: 0.5,
      brightnessMultiplier: 1.25,
      saturation: 1.2,
    },
    waveStrength: 1.2,
    opacity: 0.92,
    animationSpeed: 0.008,
  },
  deep: {
    colors: {
      shallow: "#1A5F8F",
      medium: "#144766",
      deep: "#0A2A4A",
      background: "#032A4A",
      rendererBg: 0x032a4a,
    },
    effects: {
      sparkleIntensity: 2.0,
      glintIntensity: 3.0,
      causticsIntensity: 0.4,
      foamIntensity: 0.1,
      fresnelStrength: 0.3,
      brightnessMultiplier: 1.0,
      saturation: 1.0,
    },
    waveStrength: 1.0,
    opacity: 0.98,
    animationSpeed: 0.006,
  },
};

export const getNextTheme = (current: WaveTheme): WaveTheme => {
  const themes: WaveTheme[] = ["tropical", "natural", "deep"];
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
};
