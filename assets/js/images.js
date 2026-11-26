/*
 * images.js — Central image manifest and image helpers.
 *
 * Every image reference used across the site lives in this file.
 *  - DOC  : doctor photo slots (d1-d8). Each slot maps to a local file in
 *           assets/images/ plus a Pexels CDN URL used automatically as an
 *           onerror fallback, so pages render even when a local file is missing.
 *  - IMG  : content photo slots (service covers, blog covers) following the same
 *           [localFile, fallbackUrl] convention.
 *  - img(): renders a doctor-slot <img> (local first, CDN fallback, lazy/eager).
 *  - imgSrc()/imgOnErr(): helpers for content-slot <img> tags in page templates.
 *
 * Naming convention: doctor-<n>.jpg, service-<service-id>.jpg, blog-<blog-id>.jpg
 * See IMAGE-SYSTEM.md for the full slot documentation.
 */

const PX=(id,w=1200,h=627)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

const DOC={
 d1:['doctor-1.jpg',PX(15962798,1000,1000)],
 d2:['doctor-2.jpg',PX(6129573,900,1200)],
 d3:['doctor-3.jpg',PX(6129573,1200,900)],
 d4:['doctor-4.jpg',PX(39192372,1376,768)],
 d5:['doctor-5.jpg',PX(5722163,800,1200)],
 d6:['doctor-6.jpg',PX(39192334,1376,768)],
 d7:['doctor-7.jpg',PX(39192358,1200,900)],
 d8:['doctor-8.jpg',PX(32160037,1376,768)]
};

const IMG = {
  sv: {
  'migraine-headache': ['service-migraine-headache.jpg', PX(5207232)],
  'stroke-care': ['service-stroke-care.jpg', PX(20860622)],
  'epilepsy-seizures': ['service-epilepsy-seizures.jpg', PX(7089020)],
  'parkinsons-movement': ['service-parkinsons-movement.jpg', PX(39192358)],
  'neuropathy-nerve-pain': ['service-neuropathy-nerve-pain.jpg', PX(13185359)],
  'memory-sleep': ['service-memory-sleep.jpg', PX(28512648)]
},
  bl: {
  'migraine-triggers-dhaka': ['blog-migraine-triggers-dhaka.jpg', PX(5357194)],
  'recognise-stroke-fast': ['blog-recognise-stroke-fast.jpg', PX(20860622)],
  'living-with-epilepsy': ['blog-living-with-epilepsy.jpg', PX(7089020)],
  'sleep-and-memory': ['blog-sleep-and-memory.jpg', PX(6541074)],
  'diabetic-neuropathy-care': ['blog-diabetic-neuropathy-care.jpg', PX(13185359)],
  'brain-health-habits': ['blog-brain-health-habits.jpg', PX(5723883)]
}
};

const img=(k,cls,alt,eager=false)=>`<img src="assets/images/${DOC[k][0]}" onerror="this.onerror=null;this.src='${DOC[k][1]}'" alt="${alt}" class="${cls}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;

/* src + onerror fallback for content-slot images (same pattern as img()) */
const imgSrc = e => `assets/images/${e[0]}`;
const imgOnErr = e => `onerror="this.onerror=null;this.src='${e[1]}'"`;
