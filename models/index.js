const { Sequelize, DataTypes } = require("sequelize");
const db = new Sequelize("postgres://postgres:charango@localhost:5432/henryblog", {
  logging: false,
});

const Page = db.define("page", {
  // Tu código acá:
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "closed"),
  },
  route: {
    type: DataTypes.VIRTUAL,
    get() {
      const newUrl = `/page/${this.urlTitle}`;
      return newUrl;
    },
  },
});

// .addHook() method
Page.addHook("beforeValidate", (page, options) => {
  if (page.title) {
    const newTitle = page.title.replace(/\s+/g, "_").replace(/\W/g, "");
    page.urlTitle = newTitle;
  }
});

const User = db.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
});

const Category = db.define("category", {
  // Tu código acá:
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

// Vincular User con Page
// Tu código acá:
User.hasMany(Page, { as: "author" });
Page.belongsTo(User, { as: "author" });
Page.belongsToMany(Category, { through: "PageCategory" });
Category.belongsToMany(Page, { through: "CategoryPage" });

module.exports = {
  User,
  Page,
  Category,
  db,
};
