/*
 * 404.js — Not-found page. The notFound() template itself lives in shared.js
 * because service-details.js and blog-details.js reuse it for unknown ids.
 */
boot(()=>notFound(),{cta:false,nav:'',title:pageTitle('Page not found')});
