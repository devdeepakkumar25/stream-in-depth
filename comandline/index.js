// console.log(process.argv);

const args = process.argv.slice(2);

const name = args[0] || "user";

console.log(`Hello ${name} ! welcome to our nodej tutorial`);
