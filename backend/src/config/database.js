// module.exports = {
//   dialect: "mysql",
//   host: "cptec-database.cxvovagxgbn8.sa-east-1.rds.amazonaws.com",
//   username: "admin",
//   password: "scylla123",
//   database: "cptec-database",
//   define: {
//     timestamps: true,
//     freezeTableName: true
//   }
// };
module.exports = {
  dialect: "mysql",
  host: process.env.DATABASE_ENDPOINT,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAMEDATABASE,
  define: {
    timestamps: true,
    freezeTableName: true,
  },
};
