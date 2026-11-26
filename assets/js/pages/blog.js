/*
 * blog.js — Health blog listing with category filter chips.
 * Page-specific behaviour: [data-f] category filtering over #blGrid.
 */
function blogPage(){
const cats=['All',...new Set(BL.map(b=>b.cat))];
return pageHero('Health blog','Clear, trustworthy neurology advice for patients and families.')+
sec(`<div class="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">${cats.map((c,i)=>`<button type="button" data-f="${c}" aria-pressed="${i===0}" class="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white">${c}</button>`).join('')}</div><div id="blGrid" class="grid gap-7 md:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">${BL.map(blCard).join('')}</div>`)+ctaBand();}

function blogFilter(){const app=$('#app');app.addEventListener('click',e=>{const f=e.target.closest('[data-f]');if(f){$$('[data-f]').forEach(x=>x.setAttribute('aria-pressed',x===f));$$('#blGrid [data-cat]').forEach(c=>c.classList.toggle('hidden',f.dataset.f!=='All'&&c.dataset.cat!==f.dataset.f))}})}

boot(()=>blogPage(),{cta:true,title:pageTitle('Health Blog'),after:blogFilter});
