import * as AzureEntityService from '../../Services/Table/AzureEntityService.js';

export const createEntity = async (req, res) => {
    const tableName = req.params.tableName;
    const partitionKey = req.query.partitionKey;
    const rowKey = req.query.rowKey;
    const dataObj = req.body.data;

    try {
        await AzureEntityService.create(tableName, partitionKey, rowKey, dataObj);
        res.status(200).json({msg: "Created entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to create entity"});
    }
}

export const editEntity= async (req, res) => {
    const tableName = req.params.tableName;
    const partitionKey = req.query.partitionKey;
    const rowKey = req.query.rowKey;
    const newDataObj = req.body.data;

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
        await AzureEntityService.delete(tableName, partitionKey, rowKey);
        res.status(200).json({msg: "Deleted entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to delete entity"});
    }
}