const Contact = require("../models/Contact");


const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({
      message: "Contact created successfully",
      data: contact
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
};