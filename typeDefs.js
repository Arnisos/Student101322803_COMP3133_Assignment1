const { gql } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const typeDefs = gql`
  type User {
    id: ID
    email: String
    password: String
  }
  type AuthPayload {
    token: String
    user: User
  }
  type Employee {
    id: ID
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: String
  }
  type Mutation {
    createEmployee(employee: EmployeeInput): Employee
    updateEmployee(id: String, employee: EmployeeInput): Employee
    deleteEmployee(id: String): String
    signup(input: SignupInput): AuthPayload
    login(input: LoginInput): AuthPayload
  }
  input EmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: String
  }
  input SignupInput {
    email: String
    password: String
  }
  input LoginInput {
    email: String
    password: String
  }
  type Query {
    me: User
    getAll: [Employee]
    getEmployeeById(id: ID): Employee
  }
  
`;

module.exports = typeDefs;
