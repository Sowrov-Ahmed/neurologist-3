/*
 * services.js — Services listing: all service cards plus the diagnostics
 * price list for the Dhanmondi chamber.
 */
function servicesPage(){
const dg=[['EEG (routine & sleep-deprived)',2500,'activity'],['Nerve Conduction Study (NCS)',3500,'zap'],['Electromyography (EMG)',4500,'waves'],['Botulinum toxin therapy',18000,'shield'],['Video-EEG referral coordination',6000,'video'],['Cognitive assessment report',2000,'brain']];
return pageHero('Neurology services','Complete diagnosis and treatment for disorders of the brain, spine and nervous system.')+
sec(`<div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">${SV.map(svCard).join('')}</div>`)+
sec(`${head('Diagnostics','Tests available at the Dhanmondi chamber','Transparent pricing in Bangladeshi Taka. Reports are reviewed personally by Dr. Arman.')}<div class="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">${dg.map((d,i)=>`<div data-r class="${rv(i%2)}"><div class="flex items-center gap-4 ${CARD} p-5 transition hover:-translate-y-1"><span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal/15 text-navy">${ic(d[2],'size-6')}</span><div class="flex-1"><h3 class="font-heading font-bold text-navy">${d[0]}</h3><p class="text-sm">${d[1]>=18000?'From ':''}<span class="font-semibold text-navy">${tk(d[1])}</span></p></div></div></div>`).join('')}</div>`,'bg-ice')+ctaBand();}

boot(()=>servicesPage(),{cta:true,title:pageTitle('Neurology Services')});
