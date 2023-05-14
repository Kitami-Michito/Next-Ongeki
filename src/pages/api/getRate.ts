// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Sequelize, DataTypes} from 'sequelize';
type Data = {
  songRate: number
}
const connection = new Sequelize(
  "postgres",      //DB名
  "postgres",      //ユーザー名
  "reactOngeki",     //パスワード
  {
    dialect: "postgres"   //DBの製品名
  }
);

const FumenMst = connection.define('fumen_mst', {
  id :{
    type: DataTypes.STRING(128),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(128)
  },
  difficulty: {
    type: DataTypes.INTEGER
  },
  level: {
    type: DataTypes.FLOAT
  },
  lastupdate: {
    type: DataTypes.DATE
  }
},{
  freezeTableName : true,
  timestamps: false
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  try {
    connection.authenticate();
    console.log('Connection has been established successfully.');

    FumenMst.sync();
    FumenMst.findOne({where:{ name: ['Destiny Runner']}}).then(function(value){
      console.log(value);
      res.status(200).json({songRate: value?.dataValues.level });
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}