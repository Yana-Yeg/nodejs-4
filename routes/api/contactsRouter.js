const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");

const {
  addPostValidation,
  patchPostValidation,
  patchStatusValidation,
} = require("../../middlewares/validMiddleware");

router.get("/", async (req, res) => {
  const data = await listContacts();
  res.status(200).json(data);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!contactId) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json(data);
});

router.post("/", addPostValidation, async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = await addContact(name, email, phone, favorite);
  res.status(201).json({ status: "success", newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", addPostValidation, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }
});

router.patch("/:contactId", patchPostValidation, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }
});

router.patch(
  "/:contactId/favorite",
  patchStatusValidation,
  async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contactById = await getContactById(contactId);
    if (!contactById) {
      return res.status(404).json({ status: "Not found" });
    } else {
      const updateContactItem = await updateStatusContact(contactId, {
        favorite,
      });
      res.status(200).json({ status: "success", updateContactItem });
    }
  }
);

module.exports = router;
