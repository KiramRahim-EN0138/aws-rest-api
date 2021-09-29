const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const table_name = "kiram-table";

exports.updateItemHandler = async (event) => {
    let body = JSON.parse(event.body);
    
    let result = await updateTable(body.album_id, body.artist, body.album_name)
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};

async function updateTable(album_id, artist, album_name){
    let items = null;
    let update_params = {
    
    TableName: table_name,
        Key: {album_id: album_id},
        
    UpdateExpression:  "set artist=:p, album_name=:q",
    ExpressionAttributeValues:{
        ":p":artist,
        ":q":album_name,
        },
    ReturnValues:"UPDATED_NEW"
    };

    try{
        
       let result = await dynamoDB.update(update_params).promise();
       items = result.Item;
       console.log("Item updated");
    }
    catch(err){
        console.log(err);
    }
    return items;
}