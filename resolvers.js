const Employee = require("./Employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const resolvers = {
  Query: {
    getAll: async () => {
      return await Employee.find();
    },
    getEmployeeById: async (parent, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error(`Employee not found with ID ${id}`);
      }
      return employee;
    },
  },
  Mutation: {
    updateEmployee: async (parent, args, context, info) => {
      const { id } = args;
      const { first_name, last_name, email, gender, salary } = args.employee;
      const employee = await Employee.findByIdAndUpdate(id,
        { first_name, last_name, email, gender, salary },
        { new: true }
      )
      return employee;
    },
    createEmployee: async (parent, args, context, info) => {
      const { first_name, last_name, email, gender, salary } = args.employee
      const employee = await new Employee({ first_name, last_name, email, gender, salary }).save()
      return employee;
    },
    deleteEmployee: async (parent, args, context, info) => {
      const { id } = args
      await Employee.findByIdAndDelete(id)
      return "Deleted";
    },
    signup: async (parent, { input }) => {
      const { email, password } = input;

      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const user = await User.create({
        email,
        password: hashedPassword,
      });

      // Generate a JWT token for the new user
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      // Return the token and user object in the auth payload
      return {
        token,
        user,
      };
    },login: async (parent, { input }) => {
      const { email, password } = input;

      // Find the user by email in the database
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid login credentials");
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid login credentials");
      }

      // Generate a JWT token for the authenticated user
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      // Return the token and user object in the auth payload
      return {
        token,
        user,
      };
    },
  },
};
module.exports = resolvers;
