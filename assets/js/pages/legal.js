/*
 * legal.js — Shared renderer for privacy.html and terms.html (page chosen via
 * <body data-page>; copy lives in data.js as PRIV / TERMS).
 */
function legal(title,sub,items){return pageHero(title,sub)+sec(`<div class="grid gap-10 lg:grid-cols-4"><nav aria-label="On this page" class="hidden lg:block"><div class="sticky top-32 ${CARD} p-5"><p class="mb-3 font-heading font-bold text-navy">On this page</p><ul class="space-y-2 text-sm">${items.map((x,i)=>`<li><a href="#" data-jump="s${i}" class="block rounded-lg px-3 py-1.5 transition hover:bg-ice hover:text-navy">${x[0]}</a></li>`).join('')}</ul></div></nav><div class="space-y-8 lg:col-span-3"><p class="text-sm font-semibold text-teal">Last updated: 1 January 2026</p>${items.map((x,i)=>`<div id="s${i}" data-r class="${R} scroll-mt-32"><h2 class="font-heading text-2xl font-bold text-navy">${x[0]}</h2><p class="mt-3 leading-relaxed">${x[1]}</p></div>`).join('')}</div></div>`);}
const isPrivacy = document.body.dataset.page === 'privacy';
const legalTitle = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
const legalSub = isPrivacy
  ? 'How we collect, use and protect your personal and medical information.'
  : 'Please read these terms carefully before using our website or booking a consultation.';
boot(() => legal(legalTitle, legalSub, isPrivacy ? PRIV : TERMS), { cta: false, title: pageTitle(legalTitle) });
