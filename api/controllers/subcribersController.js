const Subscribers = require('../models/Subscribers');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingSubs = await Subscribers.findOne({ email }).exec();

    if (existingSubs) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newSubscriber = new Subscribers({ email });

    await newSubscriber.save(); 

    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error in subscribe', error);
    return res.status(500).json({ message: 'Internal server error' }); 
  }
};
