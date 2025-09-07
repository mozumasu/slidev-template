import * as THREE from 'three';
import type { WaveSettings } from './useOceanThemes';
import { waterVertexShader } from '../shaders/index';
import { createWaterFragmentShader } from '../shaders/waterFragment';

/**
 * Three.jsのユーティリティ関数群
 */

/**
 * レンダラーの作成
 * @param canvas キャンバス要素
 * @param config 波の設定
 * @returns WebGLレンダラー
 */
export const createRenderer = (canvas: HTMLCanvasElement, config: WaveSettings): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(config.colors.rendererBg, 1);
  renderer.toneMappingExposure = 1.5;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  return renderer;
};

/**
 * カメラのセットアップ
 * @returns PerspectiveCameraインスタンス
 */
export const setupCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(-3, 2, 10);
  camera.lookAt(3, -3, -4);
  return camera;
};

/**
 * 水のマテリアル作成
 * @param config 波の設定
 * @returns シェーダーマテリアル
 */
export const createWaterMaterial = (config: WaveSettings): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: createWaterFragmentShader(config),
    uniforms: {
      uTime: { value: 0 },
      uWaveStrength: { value: config.waveStrength },
      uShallowColor: {
        value: new THREE.Color(config.colors.shallow),
      },
      uMidColor: { value: new THREE.Color(config.colors.medium) },
      uDeepColor: { value: new THREE.Color(config.colors.deep) },
      uOpacity: { value: config.opacity },
    },
    transparent: true,
    side: THREE.DoubleSide,
  });
};

/**
 * 水メッシュの作成
 * @param config 波の設定
 * @returns 水のメッシュ
 */
export const createWaterMesh = (config: WaveSettings): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(150, 150, 512, 512);
  const material = createWaterMaterial(config);

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2.5; // Approximately 72 degrees for better view
  mesh.rotation.y = -Math.PI / 18; // Slight side angle
  mesh.position.y = -3.5; // Lower position for wider view
  mesh.position.z = 3.0; // Adjusted forward position

  return mesh;
};

/**
 * リサイズハンドラー
 * @param camera カメラインスタンス
 * @param renderer レンダラーインスタンス
 */
export const handleResize = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): void => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

/**
 * クリーンアップ処理
 * @param animationId アニメーションID
 * @param renderer レンダラーインスタンス
 * @param waterMesh 水のメッシュ
 */
export const cleanupThree = (
  animationId: number | null,
  renderer: THREE.WebGLRenderer | null,
  waterMesh: THREE.Mesh | null
): void => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }
  if (waterMesh) {
    waterMesh.geometry.dispose();
    (waterMesh.material as THREE.Material).dispose();
  }
};