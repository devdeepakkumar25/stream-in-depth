let str1 = "8";
console.log(/./.test(str1)); //true

let str2 = "ava1";

console.log(/./g.test(str2)); //true

console.log(/[abc]/.test(str2)); //true

let str3 = "der";

console.log(/[abc]/.test(str3)); //false

console.log(/[^abc]/.test(str3)); //true

console.log(/[a-zA-Z][0-9]/.test(str3)); //false

let str4 = "abc19$";

console.log(/[a-zA-Z][0-9]/.test(str4)); //true

let str5 = "bca";

console.log(/abc/.test(str5)); //false

let str6 = "a";

console.log(/\w/.test(str6));

console.log(/\W/.test(str6));

console.log(/\s/.test(str6));

let regexp = /\S/;
console.log(regexp.test(str6));

regexp = /\d/;

console.log(regexp.test(str6));

regexp = /\D/;

console.log(regexp.test(str6));

let st1 = "ab6cdefab";
regexp = /.*/;
regexp = /[a-z]*/;
console.log(regexp.test(st1));
console.log(st1.match(regexp));

regexp = /[a-z]*/g;

console.log(st1.match(regexp));

regexp = /[a-z]+/;
st1 = "";

console.log(st1.match(regexp));

console.log(regexp.test(st1));

let st2 = "joh-n@gmail.com";

regexp = /.*gmail.*/;
console.log(regexp.test(st2));
regexp = /\w*@gmail(.*)/;
console.log(regexp.test(st2));

console.log(st2.match(regexp));

let email = "john@gmail.com";

// let r = /(\w+)@(\w+).(\w+)/;
let r = /(?<user>\w+)@(?<domain>\w+)\.(?<tld>\w+)/;

console.log(email.match(r));

// chaalenge

function verifyEmail(emial) {
  const [username, domain] = email.split("@");

  let userNameRegexp = /[a-zA-Z0-9]*/;

  let isValidUser = userNameRegexp.test(username);

  let domainRegexp = /gmail/;

  let isValidDomain = domainRegexp.test(domain);

  let domainName = domain.split(".")[0];

  if (isValidUser && isValidDomain) {
    return { username, domainName };
  }
}

console.log(verifyEmail(email));

function verifyEmailMethod(email) {
  let idx = email.indexOf("@");
  let username = email.substring(0, idx);
  let domain = email.substring(idx, email.length);
  //   const [username, domain] = email.split("@");
  let userNameRegexp = /[a-zA-Z0-9]*/;

  let isValidUser = userNameRegexp.test(username);

  let domainRegexp = /gmail/;

  let isValidDomain = domainRegexp.test(domain);

  let domainName = domain.split(".")[0];

  if (isValidUser && isValidDomain) {
    return { username, domainName };
  }
}

console.log(verifyEmailMethod(email));

function verifyEmailFun(email) {
  let regexp = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  console.log(email.match(regexp));

  if (!regexp.test(email)) return null;

  let username = email.split("@")[0];

  return { username, domainName: "gmail" };
}

verifyEmailFun(email);

function checkBinaryNumber() {
  let b = 100110010;

  let str = String(b);

  let isBinary = /^[01]+$/.test(str);

  console.log("IsBinary : ", isBinary);
}

// checkBinaryNumber();

function removeSpecilaCharcters() {
  let str = "a!B@c$1$2%3";

  str = str.replace(/[^a-zA-z0-9]/g, "");
  console.log("After removing special chracters: ", str);
}

// removeSpecilaCharcters();

function countWords() {
  let str = "    abc    def gh ijk   ";

  str = str.replace(/\s+/g, "").trim();

  let words = str.split(" ");
  console.log("str: ", str);
  console.log("Word count: ", words.length);
}

// countWords();

function isHexadecimal(value) {
  return /^[0-9a-fA-F]/.test(value);
}

console.log(isHexadecimal("1A3F"));

function isValidDateFormat(date) {
  return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(date);
}

console.log(isValidDateFormat("28/02/2023"));
