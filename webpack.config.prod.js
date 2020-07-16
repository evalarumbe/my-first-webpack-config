const imagemin = require('imagemin');
const webp = require('imagemin-webp');

// Goal:
// Write Handlebars (hbs) templates that use picture elements to provide alternate webp and jpg/png versions of images

// Background:
// I'd previously thought imagemin-webp-webpack-plugin sounded like the right tool for the job, but it generates webp files directly in dist/, which makes them inaccessible to hbs as far as I could tell, still being new at this. This approach also seems to be discouraged by the plugin author in response to a similar issue: https://github.com/iampava/imagemin-webp-webpack-plugin/issues/23 

// Solution:
// Before bundling, convert jpg and png images to webp and store them within src/
// This allows them to be used from within Handlebars templates
// Thanks to https://stackoverflow.com/questions/58827843/webpack-how-to-convert-jpg-png-to-webp-via-image-webpack-loader

imagemin( ['src/images/*.{jpg,png}'], {
    destination: 'src/images',
    plugins: [
        webp({ quality: 65 }),
    ],
});
