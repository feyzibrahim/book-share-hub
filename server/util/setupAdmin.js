const User = require("../model/userModel");

const setupAdmin = async () => {
  const user = await User.findOne({ email: "admin@booksharehub.com" });

  const admin = {
    firstName: "super",
    lastName: "admin",
    email: "admin@booksharehub.com",
    password: "Admin@1234",
    passwordAgain: "Admin@1234",
  };

  if (!user) {
    const user = await User.signup(admin, "superAdmin", true);
  }
};

module.exports = setupAdmin;
