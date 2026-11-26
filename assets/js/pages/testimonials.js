/*
 * testimonials.js — Patient stories page: rating summary bars and the full
 * testimonial grid (tilt cards via the shared behaviour).
 */
function testimonialsPage(){
const bars=[[5,94],[4,5],[3,1],[2,0],[1,0]];
return pageHero('Patient stories','Over 2,400 verified reviews from families across Dhaka and Chattogram.')+
sec(`<div data-r class="${R} mx-auto mb-12 grid max-w-4xl items-center gap-8 rounded-3xl bg-gradient-to-br from-navy to-deep p-8 text-white shadow-2xl sm:grid-cols-2 sm:p-10"><div class="text-center"><p class="font-heading text-6xl font-bold text-teal">4.9</p><div class="mt-2 flex justify-center [&>span]:text-amber-300">${stars(5)}</div><p class="mt-2 text-sm text-white/75">Based on 2,418 patient reviews</p></div><div class="space-y-2">${bars.map(b=>`<div class="flex items-center gap-3 text-sm"><span class="w-10">${b[0]} star</span><span class="h-2.5 flex-1 overflow-hidden rounded-full bg-white/15"><span class="block h-full rounded-full bg-teal" style="width:${b[1]}%"></span></span><span class="w-9 text-right">${b[1]}%</span></div>`).join('')}</div></div><div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">${TS.map((t,i)=>`<div data-r class="${rv(i%3)}"><div data-tilt class="h-full transition-transform duration-200">${tsCard(t)}</div></div>`).join('')}</div>`)+ctaBand();}

boot(()=>testimonialsPage(),{cta:true,title:pageTitle('Patient Testimonials')});
