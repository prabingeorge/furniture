import express from "express";
import * as Sequelize from 'sequelize';
import model from '../models/index.cjs';

const { CategoriesStars, CategoriesListsStars, CategoriesListItemsStars, PurchaseDetailsStars, UsersStars } = model;

CategoriesStars.hasMany(CategoriesListsStars, { foreignKey: 'category_id' });
CategoriesListsStars.belongsTo(CategoriesStars, { foreignKey: 'category_id' });

CategoriesListsStars.hasMany(CategoriesListItemsStars, { foreignKey: 'category_list_id' });
CategoriesListItemsStars.belongsTo(CategoriesListsStars, { foreignKey: 'category_list_id' });

CategoriesListItemsStars.hasMany(PurchaseDetailsStars, { foreignKey: 'category_list_item_id' });
PurchaseDetailsStars.belongsTo(CategoriesListItemsStars, { foreignKey: 'category_list_item_id' });

UsersStars.hasMany(PurchaseDetailsStars, { foreignKey: 'user_id' });
PurchaseDetailsStars.belongsTo(UsersStars, { foreignKey: 'user_id' });

const router = express.Router();

// Get all users details
router.get("/all-users", async (req, res) => {
  try {
    const users = await UsersStars.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove all users details
router.delete("/all-users-remove", async (req, res) => {
  try {
    const users = await UsersStars.truncate({ cascade: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get all purchases details
router.get("/all-purchases", async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetailsStars.findAll();
    res.json(purchaseDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove all purchases details
router.delete("/all-purchases-remove", async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetailsStars.destroy({
      where: {},
      truncate: true,
    });
    res.json(purchaseDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all purchase details
router.get("/users-purchase-details", async (req, res) => {
  try {
    const users = await CategoriesStars.findAll({
      // Select specific attributes if necessary
      // attributes: ['id', 'username'], 
      include: [
        {
          model: CategoriesListsStars,
          as: 'CategoriesListsStars', // Use the alias defined in your association
          required: true, // Forces an INNER JOIN for the Order table
          // attributes: ['id', 'orderDate'],
          include: [
            {
              model: CategoriesListItemsStars,
              as: 'CategoriesListItemsStars', // Use the alias defined in your association
              required: true, // Forces an INNER JOIN for the Order table
              // attributes: ['id', 'orderDate'],
              include: [
                {
                  model: PurchaseDetailsStars,
                  as: 'PurchaseDetailsStars', // Use the alias defined in your association
                  required: true, // Forces an INNER JOIN for the Order table
                  // attributes: ['id', 'orderDate'],
                  include: [
                    {
                      model: UsersStars,
                      as: 'UsersStars', // Use the alias defined in your association
                      required: true, // Forces an INNER JOIN for the Order table
                      // attributes: ['id', 'orderDate'],
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Truncate all the tables
router.delete("/truncate-tables", async (req, res) => {
  try {
    await CategoriesStars.truncate({ restartIdentity: true });
    await CategoriesListsStars.truncate({ restartIdentity: true });
    await CategoriesListItemsStars.truncate({ restartIdentity: true });
    await PurchaseDetailsStars.truncate({ restartIdentity: true });
    await UsersStars.truncate({ restartIdentity: true });
    res.json({message: "Truncated successfully"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
