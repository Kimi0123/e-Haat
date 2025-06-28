const {User} = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const newUser = await User.create({ firstName, lastName, email, password, phone });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Delete a user by ID
exports.deleteUser = async (req, res) => {  
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Additional methods can be added here as needed, such as login, logout, etc.
