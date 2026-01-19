let str = `My favorite color is gray.
The HEX color code is #808080.

I believe you are not color-blind.
If you are not color-blind, then tell me: what is your favorite color?
Or do you like multiple colors?

Can we make the “r” silent, like colo?
Regular expressions make me forget all spellings — hehe!

My favorite color is gray.
The HEX colorrrr code is #808080.

I believe you are not "Color blind"!
If you are not color-blind, then tell me: what is your favorite colourr?
Or do you like multiple colors?

Can we make the “r” silent, like colo?
Regular expressions make me forget all spellings — he he!
`;

console.log(str);

const r1 = /color/gi;

const r2 = /color|colour/gi;

const r3 = /(color|colour) blind/gi;

const wordCharReg = /\w/gi;

const digitReg = /\d/gi;

const spaceTabReg = /\s/gi;

const captitalReg = /\W/g;

const capitalDReg = /\D/g;

const capitalSReg = /\S/g;

const tavReg = /\t/g;

const newLineReg = /\n/g;

const dotReg = /./g;

const charReg = /[abc]/g;

const charRangeReg = /[a-zA-G]/g;

const negationReg = /[^abc]/g;

const uappearZeorOneTimeReg = /colou?r/gi;

const rAppearMultipleTimeReg = /colou?r*/gi;

const miltipleOccurrence = /color?r+/gi;

const withinTwoChar = /color?r{2}/gi;

const reptionOccrReg = /colou?r{1,3}/gi;

const skippedReg = /colou?rs\?/gi;

const rangeDigit = /[0-9]/gi;

const endReg = /!$/gi;

const multiLine = /!$/gim;

// const text = "#2A2A2A";
// const regex = /#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/gi;

const text = "+88-01912345678";
const regex = /(\+88)?-?01[1-9]\d{8}/g;

const matches = text.match(regex);

const index = text.search(regex);

const replaced = text.replace(regex, "#000000");

const testing = regex.test(text);

console.log(matches, index, replaced, testing);



