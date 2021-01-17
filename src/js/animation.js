// external deps
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger); // protect against tree-shaking

// local lib
import { slideInX } from './lib/animation-utils';

export function slideSections() {
  console.log('Run slideSections');

  const tl = gsap.timeline();

  // animate only the high-level sections that are direct children of main
  const slidingSections = [...document.querySelectorAll('main>section')];

  slidingSections.forEach((section, i) => {
    // alternate sliding left and right
    const direction = i % 2 === 0 ? 'ltr' : 'rtl';
    slideInX(tl, section, direction);
  });
}
