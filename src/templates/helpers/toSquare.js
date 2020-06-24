// this works
// module.exports = function(number) {
//   return number * number;
// };

// this works
export default function(number) {
  return number * number;
};

// does this work?
// export const toSquare = function() {
//   return number * number;
// };

// NOPE!

// Can I have several helpers in one file somehow?
// SO: Don't do it. It's cursed.
