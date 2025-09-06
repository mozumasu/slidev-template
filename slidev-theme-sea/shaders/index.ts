/**
 * 海のアニメーション用水シェーダー
 */

// 水の波用頂点シェーダー
export const waterVertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float uTime;
uniform float uWaveStrength;

// 海の波関数 - リアルな動きのためのゲルストナー波
float oceanWave(vec2 pos, vec2 direction, float frequency, float amplitude, float speed, float time) {
  float phase = dot(pos, direction) * frequency + time * speed;
  return sin(phase) * amplitude;
}

// ゲルストナー波 - よりリアルな海の波形を作成
vec3 gerstnerWave(vec2 pos, vec2 direction, float frequency, float amplitude, float speed, float time) {
  float phase = dot(pos, direction) * frequency + time * speed;
  float steepness = 0.7; // より劇的な海の波のために波の急峻さを増加
  
  float x = steepness * amplitude * direction.x * cos(phase);
  float y = steepness * amplitude * direction.y * cos(phase);
  float z = amplitude * sin(phase);
  
  return vec3(x, y, z);
}

void main() {
  vUv = uv;
  vec3 pos = position;
  vec2 worldPos = pos.xy;
  
  // 大きな海のうねり - 振幅を増やした、ゆっくりと転がる波
  vec3 swell1 = gerstnerWave(worldPos, normalize(vec2(1.0, 0.2)), 0.05, 0.35, 0.2, uTime);
  vec3 swell2 = gerstnerWave(worldPos, normalize(vec2(-0.4, 0.9)), 0.04, 0.3, 0.15, uTime * 0.7);
  vec3 swell3 = gerstnerWave(worldPos, normalize(vec2(0.6, 0.7)), 0.06, 0.25, 0.25, uTime * 0.8);
  vec3 swell4 = gerstnerWave(worldPos, normalize(vec2(-0.8, -0.5)), 0.03, 0.4, 0.18, uTime * 0.6);
  
  // 中程度の波 - より多様で自然な波
  vec3 wave1 = gerstnerWave(worldPos, normalize(vec2(0.9, 0.4)), 0.3, 0.15, 0.6, uTime * 1.2);
  vec3 wave2 = gerstnerWave(worldPos, normalize(vec2(-0.7, 0.7)), 0.4, 0.12, 0.8, uTime * 1.0);
  vec3 wave3 = gerstnerWave(worldPos, normalize(vec2(0.5, -0.8)), 0.35, 0.1, 0.9, uTime * 1.1);
  vec3 wave4 = gerstnerWave(worldPos, normalize(vec2(-0.3, -0.9)), 0.45, 0.08, 0.7, uTime * 0.9);
  
  // 表面の波紋と波立ち
  float ripple1 = oceanWave(worldPos, normalize(vec2(1.0, 0.2)), 1.5, 0.03, 1.2, uTime);
  float ripple2 = oceanWave(worldPos, normalize(vec2(0.3, 1.0)), 2.0, 0.025, 1.5, uTime);
  float ripple3 = oceanWave(worldPos, normalize(vec2(0.8, 0.8)), 2.5, 0.02, 1.8, uTime);
  
  // 風による波立ち - より自然な見た目のために周波数を減少
  float chop1 = oceanWave(worldPos, normalize(vec2(0.9, 0.1)), 3.0, 0.015, 2.0, uTime * 1.2);
  float chop2 = oceanWave(worldPos, normalize(vec2(0.1, 0.9)), 3.5, 0.012, 2.5, uTime * 1.1);
  
  // リアルな海の動きのためにすべての波成分を組み合わせる
  vec3 waveOffset = (swell1 + swell2 + swell3 + swell4 + wave1 + wave2 + wave3 + wave4) * uWaveStrength;
  waveOffset.z += (ripple1 + ripple2 + ripple3 + chop1 + chop2) * uWaveStrength;
  
  pos += waveOffset;
  vPosition = pos;
  
  // 適切な照明のためのリアルな法線を計算
  float delta = 0.01;
  vec3 pos1 = position + vec3(delta, 0.0, 0.0);
  vec3 pos2 = position + vec3(0.0, delta, 0.0);
  
  // 隣接する点に同じ波の計算を適用
  vec3 wave1_1 = (gerstnerWave(pos1.xy, normalize(vec2(1.0, 0.2)), 0.05, 0.35, 0.2, uTime) +
                 gerstnerWave(pos1.xy, normalize(vec2(-0.4, 0.9)), 0.04, 0.3, 0.15, uTime * 0.7) +
                 gerstnerWave(pos1.xy, normalize(vec2(0.6, 0.7)), 0.06, 0.25, 0.25, uTime * 0.8) +
                 gerstnerWave(pos1.xy, normalize(vec2(-0.8, -0.5)), 0.03, 0.4, 0.18, uTime * 0.6)) * uWaveStrength;
  
  vec3 wave2_1 = (gerstnerWave(pos2.xy, normalize(vec2(1.0, 0.2)), 0.05, 0.35, 0.2, uTime) +
                 gerstnerWave(pos2.xy, normalize(vec2(-0.4, 0.9)), 0.04, 0.3, 0.15, uTime * 0.7) +
                 gerstnerWave(pos2.xy, normalize(vec2(0.6, 0.7)), 0.06, 0.25, 0.25, uTime * 0.8) +
                 gerstnerWave(pos2.xy, normalize(vec2(-0.8, -0.5)), 0.03, 0.4, 0.18, uTime * 0.6)) * uWaveStrength;
  
  pos1 += wave1_1;
  pos2 += wave2_1;
  
  // 接線ベクトルと法線を計算
  vec3 tangent = normalize(pos1 - pos);
  vec3 bitangent = normalize(pos2 - pos);
  vNormal = normalize(cross(tangent, bitangent));
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;