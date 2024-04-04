const User = require("../model/userModel");

const createUser = async (email, firstName, lastName, password, role) => {
  const user = await User.findOne({ email: email });

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    passwordAgain: password,
  };

  if (!user) {
    await User.signup(newUser, role, true);
  }
};
const deleteUser = async (email) => {
  await User.findOneAndDelete({ email: email });
};

const setupUsers = async () => {
  const list = [
    {
      firstName: "super",
      lastName: "admin",
      email: "admin@booksharehub.com",
      password: "Admin@1234",
      role: "superAdmin",
    },
    {
      firstName: "Publisher",
      lastName: "One",
      email: "publisher1@gmail.com",
      password: "Publisher@1234",
      role: "publisher",
    },
    {
      firstName: "Publisher",
      lastName: "Two",
      email: "publisher2@gmail.com",
      password: "Publisher@1234",
      role: "publisher",
    },
    {
      firstName: "Publisher",
      lastName: "Three",
      email: "publisher3@gmail.com",
      password: "Publisher@1234",
      role: "publisher",
    },
    {
      firstName: "Publisher",
      lastName: "Four",
      email: "publisher4@gmail.com",
      password: "Publisher@1234",
      role: "publisher",
    },
    {
      firstName: "Publisher",
      lastName: "Five",
      email: "publisher5@gmail.com",
      password: "Publisher@1234",
      role: "publisher",
    },
    {
      firstName: "Renter",
      lastName: "One",
      email: "renter1@gmail.com",
      password: "Renter@1234",
      role: "renter",
    },
    {
      firstName: "Renter",
      lastName: "Two",
      email: "renter2@gmail.com",
      password: "Renter@1234",
      role: "renter",
    },
    {
      firstName: "Renter",
      lastName: "Three",
      email: "renter3@gmail.com",
      password: "Renter@1234",
      role: "renter",
    },
    {
      firstName: "Renter",
      lastName: "Four",
      email: "renter4@gmail.com",
      password: "Renter@1234",
      role: "renter",
    },
    {
      firstName: "Renter",
      lastName: "Five",
      email: "renter5@gmail.com",
      password: "Renter@1234",
      role: "renter",
    },
    {
      firstName: "User",
      lastName: "One",
      email: "user1@gmail.com",
      password: "User@1234",
      role: "buyer",
    },
    {
      firstName: "User",
      lastName: "Two",
      email: "user2@gmail.com",
      password: "User@1234",
      role: "buyer",
    },
    {
      firstName: "User",
      lastName: "Three",
      email: "user3@gmail.com",
      password: "User@1234",
      role: "buyer",
    },
    {
      firstName: "User",
      lastName: "Four",
      email: "user4@gmail.com",
      password: "User@1234",
      role: "buyer",
    },
    {
      firstName: "User",
      lastName: "Five",
      email: "user5@gmail.com",
      password: "User@1234",
      role: "buyer",
    },
  ];

  const deleteUserList = [
    "buyer1@gmail.com",
    "buyer2@gmail.com",
    "buyer3@gmail.com",
    "buyer4@gmail.com",
    "buyer5@gmail.com",
  ];

  deleteUserList.map((dl) => deleteUser(dl));

  list.map((li) =>
    createUser(li.email, li.firstName, li.lastName, li.password, li.role)
  );
};

module.exports = setupUsers;
