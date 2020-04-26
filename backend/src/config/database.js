require("dotenv/config");

module.exports = {
    development: {
        dialect: "sqlite",
        storage: "./src/database/database.sqlite3",
    },
    test: {
        dialect: "sqlite",
        storage: ":memory",
    },
    production: {
        dialect: "sqlite",
        storage: "./src/database/database.sqlite3",
    },
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
