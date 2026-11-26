/*
 * service-details.js — Individual service page (?id=<service-id>).
 * Mirrors the original #/services/<id> route: a valid id renders the detail
 * template, an unknown id renders the 404 template in place, and no id at all
 * falls back to the services listing.
 */
function serviceDetail(s){
const rel=SV.filter(x=>x.id!==s.id).slice(0,3);
return pageHero(s.t,s.s)+sec(`<div class="grid gap-10 lg:grid-cols-3"><div class="space-y-10 lg:col-span-2"><div data-r class="${R} overflow-hidden rounded-3xl shadow-xl"><img src="${imgSrc(s.img)}" ${imgOnErr(s.img)} alt="${s.t}" class="aspect-[16/8] w-full object-cover"></div><div data-r class="${R}"><h2 class="font-heading text-2xl font-bold text-navy">Overview</h2><p class="mt-3 text-lg">${s.o}</p></div><div data-r class="${R}"><h2 class="font-heading text-2xl font-bold text-navy">Symptoms we evaluate</h2><ul class="mt-4 grid gap-3 sm:grid-cols-2">${s.sym.map(x=>`<li class="flex items-start gap-3 rounded-2xl bg-ice p-4 text-navy"><span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-teal text-deep">${ic('check','size-4')}</span>${x}</li>`).join('')}</ul></div><div><h2 data-r class="${R} font-heading text-2xl font-bold text-navy">How treatment works</h2><ol class="mt-5 space-y-4">${s.steps.map((p,i)=>`<li data-r class="${rv(i)} flex gap-4 ${CARD} p-5"><span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy to-[#2f63b8] font-heading text-lg font-bold text-white">${i+1}</span><div><h3 class="font-heading font-bold text-navy">${p[0]}</h3><p class="text-sm">${p[1]}</p></div></li>`).join('')}</ol></div></div>
<aside class="lg:sticky lg:top-32 lg:self-start"><div data-r class="${R} overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-deep p-7 text-white shadow-[0_30px_50px_-20px_rgba(15,35,71,.7)]"><p class="text-sm font-semibold uppercase tracking-widest text-teal">Consultation</p><p class="mt-2 font-heading text-4xl font-bold">${tk(s.fee)}</p><p class="text-sm text-white/70">Follow-up from ৳800</p><ul class="mt-5 space-y-3 text-sm">${[['clock','Duration: '+s.dur],['calendar','Same-week appointments'],['shield','Reports reviewed by Dr. Arman'],['video','Video follow-up available']].map(x=>`<li class="flex items-center gap-3">${ic(x[0],'size-5 text-teal')}${x[1]}</li>`).join('')}</ul><a href="appointment.html" class="${B1} mt-6 w-full">Book Appointment</a><a href="tel:+8809610256800" class="${B3} mt-3 w-full">${ic('phone','size-4')} ${DR.hot}</a></div></aside></div>`)+sec(`${head('Related','Other services you may need')}<div class="grid gap-7 md:grid-cols-3 [perspective:1200px]">${rel.map(svCard).join('')}</div>`,'bg-ice')+ctaBand();}
const sId = new URLSearchParams(location.search).get('id') || '';
const sSvc = SV.find(x => x.id === sId);
if (sId && !sSvc) {
  boot(() => notFound(), { cta: false, nav: 'services', title: pageTitle('Page not found') });
} else if (sSvc) {
  boot(() => serviceDetail(sSvc), { cta: true, title: pageTitle(sSvc.t) });
} else {
  location.replace('services.html');
}
