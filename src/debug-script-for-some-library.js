import { library } from './some-library'; // this import statement is necessary. it's not enough to import the dependency at index.js

export default function () {
  console.log('Welcome to the debug script! Here are all the possible libraries:')
  console.log(`France: ${library('France')}`);
  console.log(`Egypt: ${library('Egypt')}`);
  console.log(`Myst: ${library('Myst')}`);
} 
