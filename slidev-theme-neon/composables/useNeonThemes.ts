// Neonテーマの設定を管理
export interface NeonGradient {
  from: string;
  to: string;
}

export interface NeonColors {
  layer1: NeonGradient;
  layer2: NeonGradient;
  layer3: NeonGradient;
  layer4?: NeonGradient;
}

export interface NeonEffects {
  blurIntensity: number;       // ブラーの強度
  animationSpeed: number;       // アニメーション速度
  hueRotationRange: number;     // 色相回転の範囲
  polygonOpacity: number[];     // 各レイヤーの不透明度
}

export interface NeonSettings {
  colors: NeonColors;
  effects: NeonEffects;
  polygonConfig: {
    counts: number[];           // ポリゴンの頂点数 [10, 6, 3]
    disturbChance: number;      // 歪みの確率
    disturb: number;            // 歪みの強度
    overflow: number;           // オーバーフロー値
  };
}

export type NeonTheme = "default" | "cyberpunk" | "synthwave";

// Neonテーマの設定
export const NEON_THEMES: Record<NeonTheme, NeonSettings> = {
  default: {
    colors: {
      layer1: { from: "#8b5cf6", to: "rgba(255, 255, 255, 0.1)" }, // 紫
      layer2: { from: "#2f96ad", to: "rgba(255, 255, 255, 0.1)" }, // 青
      layer3: { from: "#d946ef", to: "rgba(255, 255, 255, 0.1)" }, // マゼンタ
      layer4: { from: "#06b6d4", to: "#67e8f9" },
    },
    effects: {
      blurIntensity: 70,
      animationSpeed: 0.02,
      hueRotationRange: 55, // ±55度
      polygonOpacity: [0.2, 0.2, 0.2], // 各レイヤーの不透明度
    },
    polygonConfig: {
      counts: [10, 6, 3],
      disturbChance: 0.125,
      disturb: 0.5,
      overflow: 0.15,
    },
  },

  cyberpunk: {
    colors: {
      layer1: { from: "#ff00ff", to: "rgba(255, 0, 255, 0.1)" }, // マゼンタ
      layer2: { from: "#00ffff", to: "rgba(0, 255, 255, 0.1)" }, // シアン
      layer3: { from: "#ffff00", to: "rgba(255, 255, 0, 0.1)" }, // イエロー
      layer4: { from: "#ff0080", to: "#80ff00" },
    },
    effects: {
      blurIntensity: 80,
      animationSpeed: 0.025,
      hueRotationRange: 90,
      polygonOpacity: [0.25, 0.2, 0.15],
    },
    polygonConfig: {
      counts: [12, 8, 4],
      disturbChance: 0.15,
      disturb: 0.6,
      overflow: 0.2,
    },
  },

  synthwave: {
    colors: {
      layer1: { from: "#ff006e", to: "rgba(255, 0, 110, 0.1)" }, // ピンク
      layer2: { from: "#8338ec", to: "rgba(131, 56, 236, 0.1)" }, // パープル
      layer3: { from: "#3a86ff", to: "rgba(58, 134, 255, 0.1)" }, // ブルー
      layer4: { from: "#fb5607", to: "#ffbe0b" },
    },
    effects: {
      blurIntensity: 60,
      animationSpeed: 0.015,
      hueRotationRange: 40,
      polygonOpacity: [0.3, 0.25, 0.2],
    },
    polygonConfig: {
      counts: [8, 5, 3],
      disturbChance: 0.1,
      disturb: 0.4,
      overflow: 0.1,
    },
  },
};

// 次のNeonテーマを取得
export const getNextNeonTheme = (current: NeonTheme): NeonTheme => {
  const themes: NeonTheme[] = ["synthwave", "cyberpunk", "default"];
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
};