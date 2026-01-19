const guid = "d14e847f-fbc7-44fc-938d-cb808c3d8a56";

console.log(guid);

function getNumberStrSpecialChar(guid) {
  let numbers = guid.match(/\d+/g) || [];

  numbers = numbers.length !== 0 ? numbers.join("") : "";

  let letters = guid.match(/[a-zA-Z]+/g) || [];
  letters = letters.length !== 0 ? letters.join("") : "";

  let specialChars = guid.match(/[^a-zA-Z0-9]+/g) || [];

  specialChars = specialChars.length !== 0 ? specialChars.join("") : "";

  return {
    numbers,
    letters,
    specialChars,
  };
}

const { numbers, letters, specialChars } = getNumberStrSpecialChar(guid);

console.table({ numbers, letters, specialChars });
