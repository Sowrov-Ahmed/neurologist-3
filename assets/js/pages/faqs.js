/*
 * faqs.js — FAQ page: searchable accordion list.
 * Page-specific behaviour: live search filter over the question cards.
 */
function faqsPage(){
return pageHero('Frequently asked questions','Quick answers about appointments, fees, tests and what to expect.')+
sec(`<div class="mx-auto max-w-3xl"><div data-r class="${R} relative mb-8"><label for="fqs" class="sr-only">Search questions</label><span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal">${ic('search')}</span><input id="fqs" type="search" placeholder="Search questions, e.g. fee, online, reports" class="${INP} !rounded-full !py-4 !pl-12 shadow-lg"></div><div id="fqList" class="space-y-4">${FQ.map((f,i)=>acc(f[0],f[1],i)).join('')}</div><p id="fqNone" class="hidden py-8 text-center text-lg text-navy">No matching questions. Please call our hotline and we will help.</p><div data-r class="${R} mt-12 rounded-3xl bg-navy p-8 text-center text-white"><h2 class="font-heading text-2xl font-bold">Still have a question?</h2><p class="mt-2 text-white/75">Our care team is available Saturday to Thursday.</p><div class="mt-5 flex flex-col justify-center gap-3 sm:flex-row"><a href="contact.html" class="${B1}">Contact us</a><a href="tel:+8809610256800" class="${B3}">${ic('phone','size-4')} ${DR.hot}</a></div></div></div>`)+ctaBand();}

function faqSearch(){const i=$('#fqs');if(!i)return;i.addEventListener('input',()=>{const v=i.value.trim().toLowerCase();let n=0;$$('#fqList [data-faq]').forEach(c=>{const hit=!v||c.dataset.faq.includes(v)||c.textContent.toLowerCase().includes(v);c.parentElement.classList.toggle('hidden',!hit);if(hit)n++});$('#fqNone').classList.toggle('hidden',n>0)})}

boot(()=>faqsPage(),{cta:true,title:pageTitle('Frequently Asked Questions'),after:faqSearch});
