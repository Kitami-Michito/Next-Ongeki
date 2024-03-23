// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as pg from "pg";
import type { NextApiRequest, NextApiResponse } from "next";
import { Sequelize, DataTypes } from "sequelize";
type Data = {
  songRate: number;
};
const connection = new Sequelize(
  process.env.DB_NAME ?? "", //DB名
  process.env.DB_USER ?? "", //ユーザー名
  process.env.DB_PASS ?? "", //パスワード
  {
    host: process.env.DB_HOST, //host名
    dialect: "postgres", //DBの製品名
    dialectModule: pg, //使用するライブラリ
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const FumenMst = connection.define(
  "fumen_mst",
  {
    id: {
      type: DataTypes.STRING(128),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
    },
    difficulty: {
      type: DataTypes.INTEGER,
    },
    level: {
      type: DataTypes.FLOAT,
    },
    lastupdate: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    connection.authenticate();
    console.log("Connection has been established successfully.");
    console.log(req.query.name);

    FumenMst.sync();
    FumenMst.findOne({ where: { name: [req.query.name] } }).then(function (
      value
    ) {
      console.log(value);
      res.status(200).json({ songRate: value?.dataValues.level });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
