const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Employee = require("./models/Employee");
//Establishing connection with MongoDB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/employeeSystem");
}
main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

async function saveNewEmployee() {
  try {
    const newEmployee = new Employee({
      name: faker.person.firstName(),
      position: faker.person.jobTitle(),
      department: faker.commerce.department(),
      salary: faker.finance.amount({
        min: 30000,
        max: 100000,
        dec: 0,
        symbol: "",
      }),
    });

    await newEmployee.save();
    console.log("New employee saved");
  } catch (err) {
    console.log("An error occurred", err);
  }
}

for (let i = 0; i < 10; i++) {
  saveNewEmployee();
}
