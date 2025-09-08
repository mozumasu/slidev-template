<script setup lang="ts">
import { ref, computed } from "vue";

// Props for theme customization
interface Props {
  theme?: "neon" | "ocean" | "auto";
  showAnimation?: boolean;
  compact?: boolean;
  profileImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  theme: "auto",
  showAnimation: true,
  compact: false,
  profileImage: "/images/profile_mozumasu.jpeg",
});

// Profile data
const profile = {
  name: "mozumasu",
  role: "インフラエンジニア",
  tools: {
    terminal: "wezterm",
    editor: "Neovim",
    ime: "SKK",
  },
  achievement: "Software Design 6月号にweztermの記事を寄稿しました",
};

// Profile image path with base path handling
const profileImage = computed(() => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const imagePath = props.profileImage;
  
  // If the path starts with /, prepend the base URL
  if (imagePath.startsWith('/')) {
    return baseUrl + imagePath.slice(1);
  }
  return imagePath;
});

// Auto theme detection (based on current background theme)
const detectedTheme = ref<"neon" | "ocean">("ocean");

// Try to detect theme from global variables or DOM
const detectTheme = () => {
  // Check if we're in a neon theme environment
  if (typeof window !== "undefined") {
    const body = document.body;
    const hasNeon =
      body.classList.contains("theme-neon") ||
      getComputedStyle(body).backgroundColor.includes("0, 0, 0") ||
      document.querySelector('[class*="neon"]');
    detectedTheme.value = hasNeon ? "neon" : "ocean";
  }
};

// Computed theme
const currentTheme = computed(() => {
  if (props.theme === "auto") {
    return detectedTheme.value;
  }
  return props.theme;
});

// Animation delay for staggered entrance
const animationDelays = {
  role: "0s",
  tools: "0.2s",
  achievement: "0.4s",
};

// Mounted lifecycle
import { onMounted } from "vue";
onMounted(() => {
  detectTheme();
});
</script>

<template>
  <div :class="['profile-container', `container-theme-${currentTheme}`]">
    <!-- Profile Title Outside Card -->
    <h1 class="profile-title-outside" :style="{ animationDelay: '0s' }">
      Profile
    </h1>

    <!-- Card -->
    <div
      :class="[
        'self-introduction',
        `theme-${currentTheme}`,
        { compact: compact, animated: showAnimation },
      ]"
    >
      <!-- Main Content -->
      <div class="content-section">
        <!-- Role -->
        <div
          class="role-section"
          :style="{ animationDelay: animationDelays.role }"
        >
          <h3 class="section-title">ROLE</h3>
          <div class="role-content">
            <span class="role-icon">💻</span>
            <span class="role-text">{{ profile.role }}</span>
          </div>
        </div>

        <!-- Tools -->
        <div
          class="tools-section"
          :style="{ animationDelay: animationDelays.tools }"
        >
          <h3 class="section-title">MY DEV SETUP</h3>
          <div class="tools-badges">
            <div class="tool-badge">
              <img
                src="https://wezterm.org/favicon.svg"
                alt="wezterm"
                class="tool-logo"
              />
              <span class="tool-name">{{ profile.tools.terminal }}</span>
            </div>
            <div class="tool-badge">
              <img
                src="https://avatars.githubusercontent.com/u/6471485?s=200&v=4"
                alt="neovim"
                class="tool-logo"
              />
              <span class="tool-name">{{ profile.tools.editor }}</span>
            </div>
            <div class="tool-badge">
              <span class="tool-emoji">⌨️</span>
              <span class="tool-name">{{ profile.tools.ime }}</span>
            </div>
          </div>
        </div>

        <!-- Achievement -->
        <div
          class="achievement-section"
          :style="{ animationDelay: animationDelays.achievement }"
        >
          <div class="achievement-badge">
            <div class="achievement-header">
              <span class="achievement-icon">📚</span>
              <span class="achievement-label">Recent Achievement</span>
            </div>
            <div class="achievement-text">{{ profile.achievement }}</div>
          </div>
        </div>
      </div>

      <!-- Profile Avatar Section -->
      <div class="avatar-section" :style="{ animationDelay: '0s' }">
        <div class="avatar-frame">
          <div class="avatar-inner">
            <img :src="profileImage" alt="Profile" class="avatar-image" />
          </div>
        </div>
        <div class="avatar-name">mozumasu</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap");

/* Container */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1.5rem;
  padding: 3rem 0;
  box-sizing: border-box;
}

/* Profile Title Outside Card */
.profile-title-outside {
  font-size: 2.5rem;
  font-weight: 300;
  font-family: "Space Grotesk", "Outfit", sans-serif;
  color: #00ff41;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  position: relative;
  text-shadow:
    0 0 1px #00ff41,
    0 0 15px #00ff41,
    0 0 8px #39ff14,
    0 0 25px #39ff14;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(-10px);
  }
}

/* Base Styles */
.self-introduction {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 360px;
  padding: 5rem 4rem;
  margin: 0;
  width: 85%;
  max-width: 880px;
  position: relative;
  font-family: "Outfit", "Inter", "Hiragino Sans", sans-serif;
  gap: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.self-introduction:hover {
  transform: translateY(-4px);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

.self-introduction.compact {
  min-height: auto;
  padding: 2rem 2.5rem;
}

/* Animation Classes */
.animated .avatar-section,
.animated .role-section,
.animated .tools-section,
.animated .achievement-section {
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.8s ease-out forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Avatar Section */
.avatar-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.avatar-frame {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  border: 2px solid rgba(255, 215, 0, 0.5);
}

.avatar-frame:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
  border-color: rgba(255, 215, 0, 0.7);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.avatar-text {
  font-size: 3rem;
  font-weight: 700;
  font-family: "Space Grotesk", "Outfit", sans-serif;
  color: var(--accent-color);
  letter-spacing: -0.02em;
  text-shadow: var(--text-glow);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-name {
  font-size: 1.35rem;
  font-weight: 500;
  font-family: "Outfit", "Inter", sans-serif;
  color: #fff;
  letter-spacing: 0.08em;
  line-height: 1;
  opacity: 1;
  margin-top: 0.5rem;
  position: relative;
  text-shadow:
    0 0 1px #0ff,
    0 0 15px #0ff,
    0 0 8px #0ff,
    0 0 25px #0ff;
  backdrop-filter: blur(2px);
}

/* Content Section */
.content-section {
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
}

/* Role Section */
.role-section {
  padding: 0;
  padding-top: 1.5rem;
  transition: all 0.3s ease;
}

.role-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: "Outfit", "Inter", sans-serif;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.08em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.role-icon {
  font-size: 1.1rem;
  filter: grayscale(0%);
}

.role-text {
  font-family: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
  letter-spacing: -0.02em;
  color: #fff;
  text-shadow:
    0 0 1px #ffff00,
    0 0 10px #ffff00,
    0 0 5px #ffff00;
}

/* Tools Section */
.tools-section {
  padding: 0;
  transition: all 0.3s ease;
}

.section-title {
  font-size: 0.65rem;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #fff;
  opacity: 1;
  margin: 0 0 0.4rem 0;
  text-shadow:
    0 0 1px #ff10f0,
    0 0 10px #ff10f0,
    0 0 5px #ff10f0;
}

.tools-badges {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tool-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  border: none;
  border-radius: 9999px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tool-badge:hover {
  /* ホバー効果を無効化 */
}

.tool-badge:active {
  /* アクティブ効果を無効化 */
}

.tool-logo {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.4));
}

.tool-emoji {
  font-size: 1rem;
  filter: grayscale(0%);
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.4);
}

.tool-name {
  color: #fff;
  font-weight: 600;
  font-family: "Outfit", "Inter", "Hiragino Sans", sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  position: relative;
  z-index: 1;
  text-shadow:
    0 0 1px #8b5cf6,
    0 0 10px #8b5cf6,
    0 0 5px #a78bfa;
}

/* Achievement Section */
.achievement-section {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.achievement-badge {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 16px;
  padding: 1rem;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.15),
    inset 0 -1px 2px rgba(255, 255, 255, 0.2);
}

.achievement-badge:hover {
  /* ホバー効果を無効化 */
}

.achievement-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.achievement-icon {
  font-size: 1.2rem;
  filter: grayscale(0%);
}

.achievement-label {
  font-weight: 600;
  font-size: 0.7rem;
  font-family: "Outfit", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #fff;
  opacity: 1;
  text-shadow:
    0 0 1px #00ff41,
    0 0 10px #00ff41,
    0 0 5px #39ff14;
}

.achievement-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-family: "Outfit", "Inter", sans-serif;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

/* Neon Theme */
.theme-neon {
  --bg-color: rgba(0, 0, 0, 0.3);
  --primary-text: #ffffff;
  --secondary-text: #e5e5e5;
  --accent-color: #a8a8a8;
  --secondary-color: #d4d4d4;
  --card-bg: rgba(255, 255, 255, 0.05);
  --border-color: rgba(255, 255, 255, 0.2);
  --achievement-bg: rgba(255, 255, 255, 0.1);
  --accent-color-alpha: rgba(255, 255, 255, 0.3);
  --text-glow: 0 0 10px rgba(255, 255, 255, 0.5);
  --card-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  background: rgba(40, 40, 40, 0.15);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 0.5px solid rgba(160, 160, 160, 0.15);
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.theme-neon .tool-badge {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(240, 240, 240, 0.2) 20%,
    rgba(200, 200, 200, 0.15) 60%,
    rgba(160, 160, 160, 0.08) 100%
  );
}

.theme-neon .achievement-badge {
  background: rgba(0, 0, 0, 0.1);
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.25),
    inset 0 -1px 2px rgba(255, 255, 255, 0.1);
}

.theme-neon .achievement-badge:hover {
  /* ホバー効果を無効化 */
}

/* ネオンテーマではオーバーライドを削除（上記のネオン効果を維持） */

.theme-ocean {
  --bg-color: rgba(240, 248, 255, 0.3);
  --primary-text: #1e40af;
  --secondary-text: #0ea5e9;
  --accent-color: #0ea5e9;
  --secondary-color: #38bdf8;
  --card-bg: rgba(14, 165, 233, 0.05);
  --border-color: rgba(14, 165, 233, 0.2);
  --achievement-bg: rgba(14, 165, 233, 0.1);
  --accent-color-alpha: rgba(14, 165, 233, 0.3);
  --text-glow: 0 0 10px rgba(14, 165, 233, 0.5);
  --card-shadow: 0 8px 32px rgba(14, 165, 233, 0.2);

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.theme-ocean .tool-badge {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(230, 240, 255, 0.3) 20%,
    rgba(200, 220, 255, 0.2) 60%,
    rgba(180, 200, 240, 0.1) 100%
  );
}

.theme-ocean .tool-logo {
  filter: drop-shadow(0 1px 3px rgba(255, 255, 255, 0.8))
    drop-shadow(0 1px 6px rgba(219, 234, 254, 0.4));
}

.theme-ocean .tool-emoji {
  text-shadow:
    0 1px 4px rgba(255, 255, 255, 0.9),
    0 1px 8px rgba(219, 234, 254, 0.5);
}

.theme-ocean .achievement-badge {
  background: rgba(255, 255, 255, 0.3);
  box-shadow:
    inset 0 2px 4px rgba(14, 165, 233, 0.15),
    inset 0 -1px 2px rgba(255, 255, 255, 0.3);
}

.theme-ocean .achievement-badge:hover {
  /* ホバー効果を無効化 */
}

.theme-ocean .avatar-name {
  color: rgba(30, 64, 175, 0.9);
  text-shadow:
    0 1px 2px rgba(255, 255, 255, 0.5),
    0 2px 4px rgba(14, 165, 233, 0.2);
}

.theme-ocean .section-title,
.theme-ocean .achievement-label {
  color: rgba(14, 165, 233, 0.6);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
}

.theme-ocean .role-content,
.theme-ocean .achievement-text {
  color: rgba(30, 64, 175, 0.85);
}

.theme-ocean .tool-name {
  color: rgba(30, 64, 175, 0.9);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-container {
    padding: 2rem 0;
  }

  .self-introduction {
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
  }

  .content-section {
    text-align: center;
    padding-top: 3rem;
  }

  .profile-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .role-content {
    font-size: 1.25rem;
  }

  .role-icon {
    font-size: 1.5rem;
  }

  .tool-badge {
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }

  .tool-logo {
    width: 1.25rem;
    height: 1.25rem;
  }

  .tool-emoji {
    font-size: 1.25rem;
  }

  .tool-name {
    font-size: 0.85rem;
  }

  .tools-badges {
    gap: 0.5rem;
  }

  .achievement-icon {
    font-size: 2rem;
  }

  .avatar-frame {
    width: 120px;
    height: 120px;
  }

  .avatar-text {
    font-size: 2rem;
  }

  .achievement-badge {
    padding: 0.75rem 1.5rem;
  }
}

/* Compact Mode */
.compact {
  gap: 2rem;
}

.compact .content-section {
  padding-top: 2rem;
}

.compact .avatar-frame {
  width: 120px;
  height: 120px;
}

.compact .avatar-text {
  font-size: 2rem;
}

.compact .profile-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.compact .role-section {
  margin-bottom: 1.5rem;
}

.compact .role-content {
  font-size: 1.1rem;
}

.compact .role-icon {
  font-size: 1.25rem;
}

.compact .tools-section {
  margin-bottom: 1.5rem;
}

.compact .tool-badge {
  padding: 0.4rem 0.8rem;
  gap: 0.4rem;
}

.compact .tool-logo {
  width: 1rem;
  height: 1rem;
}

.compact .tool-emoji {
  font-size: 1rem;
}

.compact .tool-name {
  font-size: 0.75rem;
}
</style>
