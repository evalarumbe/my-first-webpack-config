module.exports = function(str) {
  console.log('WHAT THE ACTUALL HELL', str);
  
  // only reason i can imagine that str.toUpperCase doesn't exist is that str is coming in asynchronously, so at the time we call it, it might be Promise.toUpperCase
  console.log(typeof str === 'string');
  // console.log(str.toUpperCase()); // Failed to compile!!
  const castString = String(str); // Casting with String() fixed it, but why should I have to? This works:
  // var blorp = 'blorp';
  // console.log('I AM A ', str.toUpperCase());
  return castString.toUpperCase();
}
