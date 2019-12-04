const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const uuid = require('uuid/v4');

// Hold globals
let dbFile;
let dbPath;

const setup = (opts) => {
    dbPath = path.resolve(opts.file);
    const fileExists = fs.existsSync(dbPath);
    if(!fileExists){
        fs.writeFileSync(dbPath, '{}');
        dbFile = [];
        return;
    }
    dbFile = fs.readFileSync(dbPath, 'utf-8');
    if(typeof dbFile === 'string'){
        dbFile = JSON.parse(dbFile);
    }
    return;
}

const insert = async (obj) => {
    if(!obj){
        return Promise.reject(new Error('No data supplied'));
    }
    if(typeof obj !== 'object'){
        return Promise.reject(new Error('Invalid object data supplied'));
    }

    // Delete any uid supplied in insert, db-son handles this
    if(obj._uid){
        delete obj.uid;
    }
    // assign a new uid
    obj.uid = uuid();

    // Push object into existing
    dbFile.push(obj);

    try{
        await fs.promises.writeFile(dbPath, JSON.stringify(dbFile, null, 4));
        return Promise.resolve(obj);
    }catch(ex){
        return Promise.reject(new Error('Failed to update DB file', ex));
    }
}

const query = (match) => {
    if(!match){
        return Promise.reject(new Error('No query supplied'));
    }
    if(typeof match !== 'object'){
        return Promise.reject(new Error('Invalid query object supplied'));
    }

    // Find records based on criteria
    const matchedObjects = _.filter(dbFile, match);

    return Promise.resolve(matchedObjects);
}

const update = async (match, updateObj) => {
    if(!updateObj){
        return Promise.reject(new Error('No data supplied'));
    }
    if(typeof updateObj !== 'object'){
        return Promise.reject(new Error('Invalid object data supplied'));
    }

    if(!match){
        return Promise.reject(new Error('No query supplied'));
    }
    if(typeof match !== 'object'){
        return Promise.reject(new Error('Invalid query object supplied'));
    }

    // Find records based on criteria
    const matchedIndexes = _.keys(_.pickBy(dbFile, match))

    // Iterate matched records
    matchedIndexes.forEach((index) => {
        // Update keys of matched records
        Object.keys(updateObj).forEach((key) => {
            dbFile[index][key] = updateObj[key];
        });
    });

    try{
        await fs.promises.writeFile(dbPath, JSON.stringify(dbFile, null, 4));
        return Promise.resolve(updateObj);
    }catch(ex){
        return Promise.reject(new Error('Failed to update DB file', ex));
    }
}

const remove = async (match) => {
    if(!match){
        return Promise.reject(new Error('No query supplied'));
    }
    if(typeof match !== 'object'){
        return Promise.reject(new Error('Invalid query object supplied'));
    }

    // Find records based on criteria
    const matchedIndexes = _.keys(_.pickBy(dbFile, match))

    // Iterate matched records
    matchedIndexes.forEach((index) => {
        delete dbFile[index];
    });

    try{
        await fs.promises.writeFile(dbPath, JSON.stringify(dbFile, null, 4));
        return Promise.resolve(updateObj);
    }catch(ex){
        return Promise.reject(new Error('Failed to update DB file', ex));
    }
}

module.exports = {
    setup,
    insert,
    query,
    update,
    remove
}
