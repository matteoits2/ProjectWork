const fs = require("fs");
const { faker } = require("@faker-js/faker");

// Funzione per generare dati casuali per i clienti
const generateRandomCustomers = (numCustomers) => {
  const customers = [];

  for (let i = 1; i <= numCustomers; i++) {
    const customer = {
      id: i,
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      sex: faker.person.sex(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      bio: faker.person.bio(),
      jobTitle: faker.person.jobTitle(),
      jobType: faker.person.jobType(),
      jobDescription: faker.person.jobDescriptor(),

      sales: generateRandomSales(),
      activities: generateRandomActivities(),
    };

    customers.push(customer);
  }
  customers.forEach((customer) => {
    Object.keys(customer.sales).forEach((month) => {
      let totalSales = customer.sales[month].dailySales.reduce(
        (total, sale) => total + sale.amount,
        0
      );
      customer.sales[month].totalSales = totalSales;
    });
  });

  return customers;
};

const generateRandomDate = (month, year) => {
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(`${year}-${month + 1}-01`);
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomDate.toLocaleDateString();
};

// Funzione per generare dati casuali per le vendite
const generateRandomSales = () => {
  const sales = {};

  for (let i = 1; i < 12; i++) {
    const date = new Date(`2024-${i}-01`);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[date.getMonth()];

    sales[month] = {
      totalSales: 0,
      dailySales: [],
    };
    const numSales = Math.floor(Math.random() * 5) + 3; // Genera da 1 a 7 vendite

    for (let j = 0; j < numSales; j++) {
      sales[month].dailySales.push({
        date: generateRandomDate(i, 2024),
        amount: faker.number.int({ min: 100, max: 500 }),
      });
    }
  }

  return sales;
};

// Funzione per generare dati casuali per le attività
const generateRandomActivities = () => {
  const numActivities = Math.floor(Math.random() * 3) + 1; // Genera da 1 a 3 attività
  const activities = [];

  for (let i = 0; i < numActivities; i++) {
    const activity = {
      date: faker.date.past().toISOString().split("T")[0],
      description: faker.lorem.sentence(),
    };

    activities.push(activity);
  }

  return activities;
};

// Genera dati casuali inserendo il numero di customers da creare come parametro
const randomCustomers = generateRandomCustomers(1);

// Scrivi i dati in un file JSON
fs.writeFileSync("customers.json", JSON.stringify(randomCustomers, null, 2));

console.log("File JSON creato con successo.");
