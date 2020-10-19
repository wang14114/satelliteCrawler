var config = require('../config/config.json');
var async = require("async");

const dbName = config.db;
const collectionName = config.collection;

var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://${config.dbHost}:${config.dbPort}`;

var insertOne = (async (subCollection,data)=>{
    if(subCollection === undefined) throw "error : no collection input in function InsertOne"
    if(Object.prototype.toString.call(data) !== "[object Object]") throw "error : input data type must be Object in function InsertOne"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).insertOne(data);
    }
    finally{
        client.close();
    }
})


var insertMany = (async (subCollection,data=[])=>{
    if(subCollection === undefined) throw "no collection input in function InsertMany"
    if(Object.prototype.toString.call(data) !== "[object Array]") throw "error : input data type must be Array in function InsertMany"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).insertMany(data);
    }
    finally{
        client.close();
    }
})

var findCount = (async (subCollection , param={})=>{
    if(subCollection === undefined) throw "no collection input in function findCount"
    if(Object.prototype.toString.call(param) !== "[object Object]") throw "error : input data type must be Object in function findCount"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).countDocuments(param);
    }
    finally{
        client.close();
    }
})

var findAll = (async (subCollection,param={})=>{
    if(subCollection === undefined) throw "no collection input in function findAll"
    if(Object.prototype.toString.call(param) !== "[object Object]") throw "error : input param type must be Object in function findAll"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).find(param).toArray();
    }
    finally{
        client.close();
    }
})

var findAllByAscend = (async (subCollection,param={},sortParam={})=>{
    if(subCollection === undefined) throw "no collection input in function findAll"
    if(Object.prototype.toString.call(param) !== "[object Object]") throw "error : input param type must be Object in function findAll"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).find(param).sort(sortParam).toArray();
    }
    finally{
        client.close();
    }
})

var updateOne = (async (subCollection,query,newValues)=>{
    if(subCollection === undefined) throw "error : no collection input in function updateOne"
    if(Object.prototype.toString.call(query) !== "[object Object]") throw "error : query type must be Object in function UpdateOne"
    if(Object.prototype.toString.call(newValues) !== "[object Object]") throw "error : newValues type must be Object in function UpdateOne"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).updateOne(query,newValues);
    }
    finally{
        client.close();
    }
})

var updateMany = (async (subCollection,query,newValues)=>{
    if(subCollection === undefined) throw "error : no collection input in function updateMany"
    if(Object.prototype.toString.call(query) !== "[object Object]") throw "error : query type must be Object in function updateMany"
    if(Object.prototype.toString.call(newValues) !== "[object Object]") throw "error : newValues type must be Object in function updateMany"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).updateMany(query,newValues);
    }
    finally{
        client.close();
    }
})

var deleteOne = (async (subCollection,query)=>{
    if(subCollection === undefined) throw "error : no collection input in function DeleteOne"
    if(Object.prototype.toString.call(query) !== "[object Object]") throw "error : query type must be Object in function DeleteOne"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).deleteOne(query);
    }
    finally{
        client.close();
    }
})


var deleteMany = (async (subCollection,query)=>{
    if(subCollection === undefined) throw "no collection input in function deleteMany"
    if(Object.prototype.toString.call(query) !== "[object Object]") throw "error : quert type must be Object in function deleteMany"
    let currentCollection = collectionName + "." + subCollection;
    const client = await MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    const dbo = client.db(dbName);
    try{
        return await dbo.collection(currentCollection).deleteMany(query);
    }
    finally{
        client.close();
    }
})





module.exports = {insertOne,insertMany,findCount,findAll,updateOne,updateMany,deleteOne,deleteMany,findAllByAscend};