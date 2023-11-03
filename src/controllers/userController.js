const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ message: 'Error getting users' });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error getting the user:', error);
    return res.status(500).json({ message: 'Error getting the user' });
  }
}

async function createUser(req, res) {
  const { firstName, lastName, email, role, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !role || !password) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error' });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error updating the user:', error);
    return res.status(500).json({ message: 'Error updating the user' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting the user:', error);
    return res.status(500).json({ message: 'Error deleting the user' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
