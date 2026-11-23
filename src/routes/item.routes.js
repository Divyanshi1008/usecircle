
import express from "express";
import Item from "../models/Item.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

const categories = [
  "Books & Education",
  "Electronics",
  "Tools & DIY",
  "Home & Kitchen",
  "Sports & Fitness",
  "Photography",
  "Travel & Outdoors",
  "Other"
];

const conditions = ["New", "Like New", "Good", "Fair"];

// GET ALL AVAILABLE ITEMS
router.get("/", async (req, res) => {
  try {
    const filter = { status: "available" };

    if (req.query.city) {
      filter.city = new RegExp(
        req.query.city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }

    if (req.query.country) {
      filter.country = new RegExp(
        req.query.country.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }

    if (req.query.category && categories.includes(req.query.category)) {
      filter.category = req.query.category;
    }

    if (req.query.search?.trim()) {
      filter.title = new RegExp(
        req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }

    const items = await Item.find(filter)
      .populate("owner", "name city country")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: items.length,
      items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET MY LISTINGS
router.get("/mine", async (req, res) => {
  try {
    const items = await Item.find({
      owner: req.user._id,
      status: { $ne: "archived" }
    }).sort({ createdAt: -1 });

    res.json({ success: true, items });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ADD NEW ITEM
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      condition,
      imageUrl,
      city,
      country,
      pickupSpot
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !category ||
      !condition ||
      !city?.trim() ||
      !country?.trim() ||
      !pickupSpot?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    if (!categories.includes(category) || !conditions.includes(condition)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category or condition."
      });
    }

    const item = await Item.create({
      title,
      description,
      category,
      condition,
      imageUrl: imageUrl || "",
      city,
      country,
      pickupSpot,
      owner: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Item listed successfully!",
      item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE OWN ITEM
router.patch("/:id", async (req, res) => {
  try {
    const updates = {};
    const allowedFields = [
      "title",
      "description",
      "category",
      "condition",
      "imageUrl",
      "city",
      "country",
      "pickupSpot",
      "status"
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.category && !categories.includes(updates.category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category."
      });
    }

    if (updates.condition && !conditions.includes(updates.condition)) {
      return res.status(400).json({
        success: false,
        message: "Invalid condition."
      });
    }

    if (updates.status && !["available", "paused"].includes(updates.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status."
      });
    }

    const item = await Item.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
        status: { $ne: "archived" }
      },
      updates,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Listing not found."
      });
    }

    res.json({ success: true, item });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ARCHIVE ITEM
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      { status: "archived" },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Listing not found."
      });
    }

    res.json({
      success: true,
      message: "Item archived successfully."
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
