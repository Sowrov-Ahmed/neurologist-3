/*
 * tailwind-config.js — Centralised Tailwind CSS v4 theme configuration.
 * Single source of truth for the design system tokens: heading/body fonts,
 * brand colours (navy, deep, teal, ice, body) and every keyframe/animation
 * utility used across the site. Injected as a Tailwind `@theme` stylesheet —
 * exactly the block the original single-page site kept inline in <style
 * type="text/tailwindcss">. Loaded in <head> on every page.
 */
const TAILWIND_THEME_CSS = `
@theme {
  --font-heading: 'Quicksand', ui-sans-serif, system-ui, sans-serif;
  --font-sans: 'Fira Sans', ui-sans-serif, system-ui, sans-serif;
  --color-navy: #1E3A6D;
  --color-deep: #0F2347;
  --color-teal: #00C4DF;
  --color-ice: #F4F8FB;
  --color-body: #4A5568;
  --animate-float: float 6s ease-in-out infinite;
  --animate-float-slow: floatslow 9s ease-in-out infinite;
  --animate-spin-slow: spin 28s linear infinite;
  --animate-blob: blob 14s ease-in-out infinite;
  --animate-sway: sway 9s ease-in-out infinite;
  --animate-marquee: marquee 38s linear infinite;
  --animate-ring: ring 2s ease-out infinite;
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
  @keyframes floatslow { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(8deg); } }
  @keyframes blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.12); } 66% { transform: translate(-20px,20px) scale(.94); } }
  @keyframes sway { 0%,100% { transform: rotateY(-5deg) rotateX(1deg); } 50% { transform: rotateY(5deg) rotateX(-1deg); } }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes ring { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(2.4); opacity: 0; } }
}

`;

function applyTailwindConfig() {
  const style = document.createElement('style');
  style.type = 'text/tailwindcss';
  style.id = 'tailwind-theme';
  style.textContent = TAILWIND_THEME_CSS;
  document.head.appendChild(style);
}

applyTailwindConfig();
