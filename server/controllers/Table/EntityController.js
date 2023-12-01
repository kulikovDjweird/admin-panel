import * as AzureEntityService from '../../Services/Table/AzureEntityService.js';
import { generateKeys } from '../../utils/generateKeys.js';


export const getAll = async (req, res) => {
    const tableName = req.params.tableName;


    const result = [];

    try {
        const entitiesIter = AzureEntityService.getAll(tableName);
        for await (const entity of entitiesIter) {
            result.push(entity);
        }
        res.status(200).json({data: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error"});
    }
}


export const createEntity = async (req, res) => {
    const tableName = req.params.tableName;
    const dataObj = req.body;

    let keys = {};
    if (tableName == 'categories')
        keys = generateKeys(dataObj.parentCategory, dataObj.name);
    else if (tableName == 'goods')
        keys = generateKeys(dataObj.category, dataObj.name);

    try {
        await AzureEntityService.create(tableName, keys.partitionKey, keys.rowKey, dataObj);
        res.status(200).json({msg: "Created entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to create entity"});
    }
}

export const editEntity = async (req, res) => {
    const tableName = req.params.tableName;
    const partitionKey = req.query.partitionKey;
    const rowKey = req.query.rowKey;
    const newDataObj = req.body;

    try {
        await AzureEntityService.update(tableName, partitionKey, rowKey, newDataObj, false);
        res.status(200).json({msg: "Updated entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to update entity"});
    }
}

export const deleteEntity = async (req, res) => {
    const tableName = req.params.tableName;
    const partitionKey = req.query.partitionKey;
    const rowKey = req.query.rowKey;

    try {
        await AzureEntityService.deleteEntity(tableName, partitionKey, rowKey);
        res.status(200).json({msg: "Deleted entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to delete entity"});
    }
}