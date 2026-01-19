// const customer = getCustomer(1);

// customer
//   .then((customer) => {
//     if (!customer.isGold) return;
//     return getTopMovies(customer).then((movies) => {
//       console.log(movies);
//       return sendMail(customer.email);
//     });
//   })
//   .then((message) => {
//     if (message) console.log(message);
//   })
//   .catch((err) => console.error("Error: ", err.message));

(async () => {
  const customer = await getCustomer(1);
  if (customer.isGold) {
    const topMovies = await getTopMovies(customer);
    const message = await sendMail(customer.email);
    console.log(message);
  }
})();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting the coustomer....");
      resolve({
        id: id,
        name: "Deepak",
        isGold: true,
        email: "deepak@gmail.com",
      });
    }, 2000);
  });
}

function getTopMovies(user) {
  return new Promise((resolve, reject) => {
    console.log("Getting top moves for the user: ", user);
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 2000);
  });
}

function sendMail(email) {
  return new Promise((resolve, reject) => {
    console.log("Sending mail to email: ", email);
    setTimeout(() => {
      resolve("mail sent thank & Regards");
    }, 2000);
  });
}

// getCustomer(1, function (customer) {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies(customer, function (movies) {
//       console.log("Top Movies: ", movies);
//       sendMail(customer.email, function (msg) {
//         console.log("message: ", msg);
//       });
//     });
//   }
// });

// getCustomer(1, handleCustomer);

// function handleCustomer(customer) {
//   console.log("Customer:", customer);

//   if (customer.isGold) {
//     getTopMovies(customer, function (movies) {
//       handleTopMovies(movies, customer.email);
//     });
//   }
// }

// function handleTopMovies(movies, email) {
//   console.log("Top Movies:", movies);
//   sendMail(email, handleSendMail);
// }

// function handleSendMail(message) {
//   console.log("Message:", message);
// }

// function getCustomer(id, callback) {
//   setTimeout(() => {
//     console.log("Getting the coustomer....");
//     callback({
//       id: id,
//       name: "Deepak",
//       isGold: true,
//       email: "deepak@gmail.com",
//     });
//   }, 2000);
// }

// function getTopMovies(user, callback) {
//   console.log("Getting top moves for the user: ", user);
//   setTimeout(() => {
//     callback(["movie1", "movie2"]);
//   }, 2000);
// }

// function sendMail(email, callback) {
//   console.log("Sending mail to email: ", email);
//   setTimeout(() => {
//     callback("mail sent thank & Regards");
//   }, 2000);
// }
