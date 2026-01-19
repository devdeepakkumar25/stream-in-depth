const person = {
  name: "John",
  age: 25,
};

const personProxy = new Proxy(person, {
  // Intercept reading properties
  get(target, property, receiver) {
    console.log(`Getting ${property}...`);
    return Reflect.get(target, property, receiver);
  },

  // Intercept writing properties
  set(target, property, value, receiver) {
    console.log(`Setting ${property} to ${value}`);

    // VALIDATION
    if (property === "name") {
      if (typeof value !== "string") {
        throw new TypeError("Name must be a string");
      }
    }

    if (property === "age") {
      if (typeof value !== "number" || value <= 0) {
        throw new TypeError("Age must be a positive number");
      }
    }

    return Reflect.set(target, property, value, receiver);
  },

  // Prevent delete
  deleteProperty(target, property) {
    console.log(`Attempt to delete ${property} rejected`);
    throw new Error("Deletion not allowed!");
  },
});

// Usage
console.log(personProxy.name); // Getting name... → John
personProxy.age = 30; // Setting age to 30
personProxy.name = "Alice"; // Setting name to Alice

// personProxy.age = -10;          // ❌ Error: Age must be positive
// delete personProxy.name;        // ❌ Error: not allowed
