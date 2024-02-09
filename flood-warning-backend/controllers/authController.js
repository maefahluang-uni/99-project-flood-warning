const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Login failed: User not found' });
    }

    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        throw error;
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Login failed: Incorrect password' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, userId: user._id, email: user.email });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during authentication' });
  }
};




exports.register = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      console.log('Received registration data:', req.body); // Log the incoming registration data

      let user = await User.findOne({ email });
      if (user) {
          console.log('User already exists with email:', email); // Log if user already exists
          return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({ username, email, password });
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();
      console.log('User saved to database:', user);

      const payload = { user: { id: user.id } };
      jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '5d' },
          (err, token) => {
              if (err) throw err;
              console.log('JWT token generated for user:', user); // Log the generated token
              res.status(201).json({ token });
          }
      );
  } catch (err) {
      console.error('Error during registration:', err); // Log the caught error
      res.status(500).send('Server error');
  }
};
