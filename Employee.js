const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  salary: String
});
const Employee = mongoose.model("employee", EmployeeSchema);
module.exports = Employee;
