import type { WaveSettings } from '../composables/useOceanThemes';

/**
 * 色をHEXからVec3文字列に変換
 */
const hexToVec3 = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0.0, 0.0, 0.0";

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  return `${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}`;
};

/**
 * 水のフラグメントシェーダーを生成
 */
export const createWaterFragmentShader = (config: WaveSettings): string => `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uShallowColor;
  uniform vec3 uDeepColor;
  uniform vec3 uMidColor;
  uniform float uOpacity;
  
  // リアルな水面効果のためのノイズ関数
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453;
    float b = sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453;
    float c = sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
    float d = sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
    
    return mix(mix(fract(a), fract(b), f.x), mix(fract(c), fract(d), f.x), f.y);
  }
  
  // 海の泡と白波
  float foam(vec2 uv, float time) {
    vec2 p = uv * 8.0;
    float f = 0.0;
    
    for(int i = 0; i < 3; i++) {
      float scale = pow(2.0, float(i));
      vec2 offset = vec2(time * 0.1, time * 0.08) * scale;
      f += noise(p * scale + offset) / scale;
    }
    
    return smoothstep(0.6, 1.0, f);
  }
  
  // 強化されたコースティクスパターン - ネットワーク状の水面反射
  float caustics(vec2 uv, float time) {
    vec2 p = uv * 8.0; // ネットワークパターン用の高詳細
    float c = 0.0;
    
    // ネットワーク状のコースティクスパターンを作成
    for(int i = 0; i < 4; i++) {
      float scale = pow(1.6, float(i));
      vec2 offset = vec2(time * 0.05, time * 0.04) * scale;
      
      vec2 q = p * scale + offset;
      
      // ネットワーク効果のための交差する波パターンを作成
      float wave1 = sin(q.x * 2.0 + time * 0.8) * cos(q.y * 1.8 + time * 0.6);
      float wave2 = sin((q.x + q.y) * 1.4 + time * 0.7) * cos((q.x - q.y) * 1.6 + time * 0.5);
      float wave3 = sin(q.x * 1.2 - q.y * 1.8 + time * 0.9) * cos(q.x * 1.6 + q.y * 1.2 + time * 0.4);
      
      // 波を組み合わせてネットワークパターンを作成
      float combined = (wave1 + wave2 + wave3) * 0.33;
      combined = abs(combined); // 鋭いネットワークラインを作成
      combined = pow(combined, 2.0); // パターンをシャープにする
      
      c += combined / scale;
    }
    
    // 細かいメッシュ状の詳細を追加
    vec2 meshPattern = p * 3.0 + time * 0.2;
    float mesh = abs(sin(meshPattern.x * 4.0)) * abs(sin(meshPattern.y * 4.0));
    mesh = pow(mesh, 0.5);
    
    c = c * 0.7 + mesh * 0.3;
    return smoothstep(0.2, 0.9, c);
  }
  
  // 参照画像のような強化された太陽のきらめき効果
  float sunSparkles(vec2 uv, vec3 normal, float time) {
    float sparkle = 0.0;
    
    // 強烈な太陽のきらめき - 複数の周波数レイヤー
    for(int i = 0; i < 5; i++) {
      float scale = pow(2.0, float(i)) * 8.0;
      vec2 sparkleUv = uv * scale + time * (0.2 + float(i) * 0.1);
      
      float s = noise(sparkleUv);
      // 鋭く明るいきらめき
      s = pow(smoothstep(0.8, 1.0, s), 10.0 + float(i) * 2.0);
      sparkle += s / pow(2.0, float(i));
    }
    
    // 動く太陽の経路のきらめきを追加
    vec2 sunPath = uv + vec2(sin(time * 0.3) * 0.1, cos(time * 0.5) * 0.05);
    float sunPathSparkle = noise(sunPath * 20.0 + time * 0.8);
    sunPathSparkle = pow(smoothstep(0.85, 1.0, sunPathSparkle), 15.0);
    sparkle += sunPathSparkle * 2.0;
    
    // 波の影響を受ける方向性のある太陽反射
    vec3 sunDir = normalize(vec3(0.6, 1.8, 0.4)); // 高い太陽角度
    vec3 viewDir = normalize(vec3(0.0, 1.0, 0.3));
    vec3 reflectDir = reflect(-sunDir, normal);
    float sunReflection = max(0.0, dot(viewDir, reflectDir));
    sunReflection = pow(sunReflection, 120.0);
    
    // 表面の向きと組み合わせる
    float surfaceAlignment = max(0.0, dot(normal, vec3(0.0, 0.0, 1.0)));
    surfaceAlignment = pow(surfaceAlignment, 0.5);
    
    return sparkle * sunReflection * surfaceAlignment * 3.0;
  }
  
  // 海面のきらめき効果
  float oceanShimmer(vec2 uv, float time) {
    float shimmer = 0.0;
    
    // 実際の海面のような複数のきらめきレイヤー
    for(int i = 0; i < 3; i++) {
      float scale = 30.0 + float(i) * 15.0;
      vec2 offset = vec2(time * 0.4, time * 0.3) * (1.0 + float(i) * 0.2);
      
      float layer = noise(uv * scale + offset);
      layer = smoothstep(0.7, 1.0, layer);
      layer = pow(layer, 3.0);
      
      shimmer += layer / (float(i) + 1.0);
    }
    
    return shimmer;
  }
  
  void main() {
    // 深海用の波ベースの深度を計算
    float waveHeight = vPosition.z;
    float depth = 1.0 - abs(waveHeight) * 1.5; // 深度変化を少なくする
    depth = clamp(depth, 0.0, 1.0);
    
    // テーマ設定に基づく動的な水の色
    vec3 shallowColor = vec3(${hexToVec3(config.colors.shallow)});
    vec3 mediumColor = vec3(${hexToVec3(config.colors.medium)});
    vec3 deepColor = vec3(${hexToVec3(config.colors.deep)});
    
    // 設定に基づく水のグラデーション
    float viewDepth = 0.7 + vUv.y * 0.2;
    vec3 waterColor = mix(deepColor, mediumColor, viewDepth);
    waterColor = mix(waterColor, shallowColor, depth * 0.6 + 0.2);
    
    // 参照画像のような明るい波ベースの照明
    float waveShading = waveHeight * 2.0;
    float lightIntensity = 1.2 + waveShading * 0.4; // より明るいベース
    waterColor *= lightIntensity;
    
    // 非常に微妙な波の影 - 明るさを保つ
    if (waveHeight < -0.02) {
      waterColor *= vec3(0.95, 0.97, 1.0); // 非常に薄い青色の色合い
    } else if (waveHeight > 0.02) {
      waterColor *= vec3(1.1, 1.08, 1.05); // 微妙なハイライト
    }
    
    // 深い水の色から始める - 底は見えない
    vec3 color = waterColor;
    
    // 動的な強度の表面コースティクス
    float causticsPattern = caustics(vUv, uTime);
    vec3 surfaceCaustics = vec3(1.0, 1.0, 0.95) * causticsPattern * ${config.effects.causticsIntensity.toFixed(1)};
    
    // 設定可能な強度でコースティクスを適用
    float causticsStrength = 0.5 + smoothstep(-0.02, 0.05, waveHeight) * 0.5;
    color += surfaceCaustics * causticsStrength;
    
    // 動的な強度で太陽のきらめきを追加
    float sparklePattern = sunSparkles(vUv, vNormal, uTime);
    vec3 sunSparkleColor = vec3(1.0, 0.95, 0.8); // 暖かい金色の太陽の色
    color += sunSparkleColor * sparklePattern * ${config.effects.sparkleIntensity.toFixed(1)};
    
    // 海面のきらめきを追加
    float shimmerPattern = oceanShimmer(vUv, uTime);
    vec3 shimmerColor = vec3(0.9, 0.95, 1.0); // 冷たいきらめき
    color += shimmerColor * shimmerPattern * 1.5;
    
    // 動的な強度の泡
    float foamPattern = foam(vUv, uTime);
    float foamIntensity = smoothstep(0.04, 0.08, waveHeight) * foamPattern;
    vec3 foamColor = vec3(0.9, 0.93, 0.95);
    color = mix(color, foamColor, foamIntensity * ${config.effects.foamIntensity.toFixed(2)});
    
    // 動的な強度のフレネル反射
    vec3 viewDir = normalize(vec3(0.2, 1.0, 0.8));
    float fresnel = 1.0 - max(0.0, dot(vNormal, viewDir));
    fresnel = pow(fresnel, 1.5);
    
    // 太陽の影響を受ける空の反射
    vec3 skyColor = vec3(0.8, 0.9, 1.0); // 明るい青空
    vec3 sunSkyColor = vec3(1.0, 0.98, 0.9); // 明るく暖かい太陽の影響を受けた空
    vec3 finalSkyColor = mix(skyColor, sunSkyColor, 0.2);
    color = mix(color, finalSkyColor, fresnel * ${config.effects.fresnelStrength.toFixed(1)});
    
    // 動的な強度の太陽の輝き - 金色の太陽反射
    vec3 sunDir = normalize(vec3(0.6, 2.0, 0.4)); // より高い太陽角度
    float sunGlint = pow(max(0.0, dot(vNormal, sunDir)), 150.0);
    vec3 sunGlintColor = vec3(1.0, 0.9, 0.6); // 金色の太陽反射
    color += sunGlintColor * sunGlint * ${config.effects.glintIntensity.toFixed(1)} * (1.0 + waveHeight * 2.0);
    
    // 二次太陽反射経路
    vec3 sunDir2 = normalize(vec3(0.4, 1.8, 0.6));
    float sunGlint2 = pow(max(0.0, dot(vNormal, sunDir2)), 100.0);
    color += sunGlintColor * sunGlint2 * ${(config.effects.glintIntensity * 0.4).toFixed(1)};
    
    // 海面のハイライト - 複数の反射角度
    float highlight1 = pow(max(0.0, dot(vNormal, normalize(vec3(0.3, 1.0, 0.7)))), 25.0);
    float highlight2 = pow(max(0.0, dot(vNormal, normalize(vec3(0.7, 1.0, 0.3)))), 35.0);
    vec3 highlightColor = vec3(0.95, 0.98, 1.0);
    color += highlightColor * (highlight1 + highlight2) * 1.2;
    
    // 動的なカラーグレーディング
    color = pow(color, vec3(0.75)); // ガンマ補正
    
    // トーンマッピング
    color = color / (1.0 + color * 0.3);
    
    // 動的な乗数での明度ブースト
    color *= ${config.effects.brightnessMultiplier.toFixed(1)};
    
    // 強化されたカラーチャンネル
    color.b = min(color.b * 1.2, 1.0); // 青をブースト
    color.g = min(color.g * 1.1, 1.0); // アクア色のために緑をブースト
    color.r = min(color.r * 0.9, 1.0); // 赤をわずかに減少
    
    // 最終的なクランプ
    color = clamp(color, vec3(0.0), vec3(1.0));
    
    // 動的な彩度ブースト
    float saturation = ${config.effects.saturation.toFixed(1)};
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, saturation);
    
    gl_FragColor = vec4(color, uOpacity);
  }
`;