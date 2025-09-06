import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Three.jsアニメーション用のパフォーマンス監視コンポーザブル
 */

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsed: number;
  memoryLimit: number;
  drawCalls: number;
  triangles: number;
  points: number;
  lines: number;
}

export function usePerformance() {
  const metrics = ref<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    memoryUsed: 0,
    memoryLimit: 0,
    drawCalls: 0,
    triangles: 0,
    points: 0,
    lines: 0,
  });

  const isMonitoring = ref(false);
  const showMetrics = ref(false);

  let frameCount = 0;
  let lastTime = performance.now();
  let animationId: number | null = null;

  /**
   * FPSとフレーム時間を更新
   */
  const updateFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      metrics.value.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      metrics.value.frameTime = Math.round((currentTime - lastTime) / frameCount);
      frameCount = 0;
      lastTime = currentTime;
    }
  };

  /**
   * メモリ使用量を更新（利用可能な場合）
   */
  const updateMemory = () => {
    // @ts-ignore - performance.memory is Chrome-specific
    if (performance.memory) {
      // @ts-ignore
      metrics.value.memoryUsed = Math.round(performance.memory.usedJSHeapSize / 1048576);
      // @ts-ignore
      metrics.value.memoryLimit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
    }
  };

  /**
   * Three.jsレンダラー情報を更新
   * @param renderer Three.jsレンダラーインスタンス
   */
  const updateRendererInfo = (renderer: any) => {
    if (renderer && renderer.info) {
      const info = renderer.info;
      metrics.value.drawCalls = info.render.calls || 0;
      metrics.value.triangles = info.render.triangles || 0;
      metrics.value.points = info.render.points || 0;
      metrics.value.lines = info.render.lines || 0;
    }
  };

  /**
   * パフォーマンスを監視
   * @param renderer 詳細なメトリクス用のThree.jsレンダラー（オプション）
   */
  const startMonitoring = (renderer?: any) => {
    if (isMonitoring.value) return;
    
    isMonitoring.value = true;
    
    const monitor = () => {
      updateFPS();
      updateMemory();
      
      if (renderer) {
        updateRendererInfo(renderer);
      }
      
      if (isMonitoring.value) {
        animationId = requestAnimationFrame(monitor);
      }
    };
    
    monitor();
  };

  /**
   * 監視を停止
   */
  const stopMonitoring = () => {
    isMonitoring.value = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };

  /**
   * メトリクス表示を切り替え
   */
  const toggleMetrics = () => {
    showMetrics.value = !showMetrics.value;
  };

  /**
   * メトリクスをリセット
   */
  const resetMetrics = () => {
    metrics.value = {
      fps: 0,
      frameTime: 0,
      memoryUsed: 0,
      memoryLimit: 0,
      drawCalls: 0,
      triangles: 0,
      points: 0,
      lines: 0,
    };
    frameCount = 0;
    lastTime = performance.now();
  };

  /**
   * パフォーマンスグレードを取得
   * @returns パフォーマンスグレード (A, B, C, D, F)
   */
  const getPerformanceGrade = (): string => {
    const fps = metrics.value.fps;
    if (fps >= 55) return 'A';
    if (fps >= 45) return 'B';
    if (fps >= 30) return 'C';
    if (fps >= 20) return 'D';
    return 'F';
  };

  /**
   * パフォーマンスが許容範囲内かチェック
   * @param minFPS 最小許容FPS（デフォルト: 30）
   * @returns パフォーマンスが許容範囲内の場合true
   */
  const isPerformanceAcceptable = (minFPS: number = 30): boolean => {
    return metrics.value.fps >= minFPS;
  };

  /**
   * パフォーマンスサマリーを取得
   * @returns パフォーマンスサマリー文字列
   */
  const getPerformanceSummary = (): string => {
    const grade = getPerformanceGrade();
    const fps = metrics.value.fps;
    const memory = metrics.value.memoryUsed;
    
    return `Performance: ${grade} | FPS: ${fps} | Memory: ${memory}MB`;
  };

  // アンマウント時にクリーンアップ
  onUnmounted(() => {
    stopMonitoring();
  });

  return {
    // 状態
    metrics,
    isMonitoring,
    showMetrics,
    
    // メソッド
    startMonitoring,
    stopMonitoring,
    toggleMetrics,
    resetMetrics,
    
    // ユーティリティ
    getPerformanceGrade,
    isPerformanceAcceptable,
    getPerformanceSummary,
  };
}

/**
 * グローバルパフォーマンスモニターのシングルトン
 */
let globalMonitor: ReturnType<typeof usePerformance> | null = null;

export function useGlobalPerformance() {
  if (!globalMonitor) {
    globalMonitor = usePerformance();
  }
  return globalMonitor;
}