const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const table_name = "kiram-table";


exports.deleteByIdHandler = async (event) => {
    
    let result = await removeFromTable(event.pathParameters.id);
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Deleted from table'),
    };
    return response;
};


async function removeFromTable(album_id){
    
    let item = null;
    let params = {
    
    TableName: table_name,
    Key: {
            album_id: album_id
        }
    };
    
    try{
        let result = await dynamoDB.delete(params).promise();
        console.log("Item deleted: " + result.album_name);
        item = result.Item;
    }
    
    catch(error){
        console.log(error);
    }
    
    return item;
    
}