let arr = Array.from("Hello");

console.log(arr);

const set = new Set([1, 2, 3]);

console.log(set);

arr = Array.from(set);

console.log(arr);

const map = new Map([
  ["a", 1],
  ["b", 2],
]);

console.log(map);
arr = Array.from(map);

console.log(arr);

arr = Array.from([1, 2, 3], (x) => x * 2);

console.log(arr);

arr = Array.from({ length: 5 });

console.log(arr);

arr = Array.from({ length: 5 }, (_, i) => i);
console.log(arr);

arr = Array.from({ length: 4 }, () => "A");
console.log(arr);

let matrix = Array.from({ length: 3 }, () =>
  Array.from({ length: 4 }, () => 0),
);

console.log(matrix);

const map2 = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["d", 4],
]);

console.log(map2);

for (let [key, value] of map2.entries()) {
  console.log(key, value);
}
