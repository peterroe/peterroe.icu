
<script setup lang="ts">
import { isDark } from '/~/logics'
</script>

<template>
  <header class="header z-40 hover:!blur-default">
    <router-link
      class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none"
      to="/"
      focusable="false"
    >
      <img v-show="isDark" src="/download.png" alt="logo">
      <img v-show="!isDark" src="/download.png" alt="logo" animate-bounce>
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" lt-md="!gap-3">
        <!-- more icon visit: https://icones.js.org/collection/all -->
        <!-- <router-link to="/2022"> -->
        <!-- <span class="lt-md:hidden">2022</span> -->
        <!-- <ri-article-line class="md:hidden" /> -->
        <!-- </router-link> -->
        <!-- <router-link to="/posts">
          <span class="lt-md:hidden">Blog</span>
          <ri-article-line class="md:hidden" />
        </router-link> -->
        <!-- <router-link to="/talks" class="lt-md:hidden">
          Talks
        </router-link> -->
        <!-- <router-link to="/projects">
          <span class="lt-md:hidden">Projects</span>
          <ri-lightbulb-line class="md:hidden" />
        </router-link> -->
        <router-link to="/tools" title="Tools">
          <span class="lt-md:hidden">Tools</span>
          <carbon-tools class="md:hidden" />
        </router-link>
        <!-- <router-link to="/kits" title="Kits">
          <span class="lt-md:hidden">Kits</span>
          <carbon-cics-system-group
            class="md:hidden"
          />
        </router-link> -->
        <!-- <router-link to="/Column" title="Column">
          <span class="lt-md:hidden">Column</span>
          <carbon-column-dependency
            class="md:hidden"
          />
        </router-link> -->
        <!-- <router-link class="lt-md:hidden" to="/gist" title="Find">
          <span>Gist</span>
        </router-link> -->
        <!-- <router-link to="/quickFind" title="Find">
          <carbon-lightning />
        </router-link> -->
        <!-- <router-link to="/bookmarks" title="Bookmarks" class="lt-md:hidden">
          <ri-bookmark-line />
        </router-link> -->
        <router-link to="/packages" title="Packages">
          <span class="lt-md:hidden">Packages</span>
          <mdi-package-variant-closed class="md:hidden"/>
        </router-link>
        <!-- <router-link class="lt-md:hidden" to="/books" title="books">
          <ph-books />
        </router-link> -->
        <!-- <router-link to="/notes" title="Notes" class="lt-md:hidden">
          <ri-sticky-note-line />
        </router-link> -->
        <!-- <a href="https://t.me/peterroe" target="_blank" title="Telegram" >
          <tabler-brand-telegram />
        </a> -->
        <!-- <router-link to="/log" title="log" class="lt-md:hidden">
          <mdi-console />
        </router-link> -->
        <a href="https://github.com/peterroe" target="_blank" title="GitHub">
          <uil-github-alt />
        </a>
        <!-- <router-link to="/life" title="life" class="lt-md:hidden">
          <ri-calendar-check-line />
        </router-link> -->
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
