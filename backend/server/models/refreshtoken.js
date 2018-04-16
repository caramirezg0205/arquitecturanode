'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const TokensRefresh = sequelize.define('TokensRefresh', {
    token: Sequelize.TEXT,
    username: Sequelize.TEXT
  },{
    timestamps:false,
    underscored:true,
    tableName:'refresh_tokens'
    });

  return TokensRefresh;
};