<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  code: string
  lang?: string
  title?: string
  lineNumbers?: boolean
  highlightLines?: number[]
  glowColor?: 'cyan' | 'matrix' | 'purple' | 'pink' | 'yellow' | 'orange'
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'typescript',
  lineNumbers: true,
  glowColor: 'cyan'
})

const copied = ref(false)

const glowClass = computed(() => {
  const colorMap = {
    cyan: 'border-cyan-400 shadow-cyan-400/50',
    matrix: 'border-green-400 shadow-green-400/50',
    purple: 'border-purple-400 shadow-purple-400/50',
    pink: 'border-pink-400 shadow-pink-400/50',
    yellow: 'border-yellow-400 shadow-yellow-400/50',
    orange: 'border-orange-400 shadow-orange-400/50'
  }
  return colorMap[props.glowColor]
})

const languageLabel = computed(() => {
  const labels: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    vue: 'Vue',
    html: 'HTML',
    css: 'CSS',
    python: 'Python',
    bash: 'Bash',
    json: 'JSON'
  }
  return labels[props.lang] || props.lang.toUpperCase()
})

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="neon-code-block">
    <div class="code-header">
      <div class="code-title">
        <span v-if="title" class="title-text">{{ title }}</span>
        <span class="lang-badge" :class="`badge-${glowColor}`">
          {{ languageLabel }}
        </span>
      </div>
      <button 
        @click="copyCode"
        class="copy-button"
        :class="{ 'copied': copied }"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <div class="code-content" :class="glowClass">
      <pre><code :class="`language-${lang}`">{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.neon-code-block {
  margin: 1rem 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
}

.code-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-text {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
}

.lang-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid;
  box-shadow: 0 0 10px;
}

.badge-cyan {
  color: #00ffff;
  border-color: #00ffff;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.badge-matrix {
  color: #00ff41;
  border-color: #00ff41;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}

.badge-purple {
  color: #a78bfa;
  border-color: #8b5cf6;
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

.badge-pink {
  color: #ff10f0;
  border-color: #ff10f0;
  box-shadow: 0 0 10px rgba(255, 16, 240, 0.5);
}

.badge-yellow {
  color: #ffff00;
  border-color: #ffff00;
  box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
}

.badge-orange {
  color: #ff9500;
  border-color: #ff9500;
  box-shadow: 0 0 10px rgba(255, 149, 0, 0.5);
}

.copy-button {
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.copy-button.copied {
  color: #00ff41;
  border-color: #00ff41;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}

.code-content {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid;
  border-radius: 0.75rem;
  padding: 1.5rem;
  overflow-x: auto;
  box-shadow: 0 0 20px;
  transition: all 0.3s ease;
}

.code-content:hover {
  box-shadow: 0 0 30px;
}

.code-content pre {
  margin: 0;
  background: transparent !important;
  border: none !important;
}

.code-content code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #ffffff;
  background: transparent !important;
}
</style>