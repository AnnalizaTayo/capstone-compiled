const Faqs = require('../models/Faqs');

exports.addFaqs = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Fields are required.' });
    }

    const existingFaqs = await Faqs.findOne({ question }).exec();

    if (existingFaqs) {
      return res.status(409).json({ message: 'Duplicate entry of questions.' });
    }

    const newSubscriber = new Faqs({ question, answer });

    await newSubscriber.save(); 

    return res.status(201).json({ message: 'New FAQ entry has been uploaded successfully.' });
  } catch (error) {
    console.error('Error in subscribe', error);
    return res.status(500).json({ message: 'Internal server error' }); 
  }
};

exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faqs.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



