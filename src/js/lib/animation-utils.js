/**
 * @param {Timeline} tl - from node_modules/gsap
 * @param {(string | HTMLElement)} element - string should be a valid DOM selector
 * @param {('ltr'|'rtl')} direction - which way should the element slide?
 * @param {number} [distance=200] - pixels
 */
export function slideInX(tl, element, direction, distance = 200) {
  const fromX = direction === 'ltr' ?  -distance : distance;

  tl.from(element, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
    },
    x: fromX,
  });
}
