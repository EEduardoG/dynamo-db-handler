


# dynamo-db-handler

The dynamo-db-handler library provides methods to interact with the AWS DynamoDB database.


## Methods
The library provides the following methods:

### setClient(): DynamoDBClient
Sets up and returns a DynamoDB client based on the configuration provided in the environment variables or using default configuration **(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,AWS_SESSION_TOKEN,AWS_REGION)**.

### save(params: PutItemCommandInput): Promise<PutItemCommandOutput>
Saves an item to DynamoDB using the PutItemCommand. Returns a Promise that resolves to the response from DynamoDB.

### update(params: UpdateItemCommandInput): Promise<UpdateItemCommandOutput>
Updates an item in DynamoDB using the UpdateItemCommand. Returns a Promise that resolves to the response from DynamoDB.

### bulk(objectsToProcess: Array<any>, tableName: string): Promise<Boolean>
Performs a bulk write operation on DynamoDB by batching multiple items for efficient processing. Returns a Promise that resolves to true if the operation is successful.

### query(queryCommandInput: QueryCommandInput): Promise<Array<any>>
Executes a query on DynamoDB using the QueryCommand. Returns a Promise that resolves to an array of queried items.

### findAll(params: ScanCommandInput): Promise<Array<any>>
Retrieves all items from a DynamoDB table using the ScanCommand. Handles pagination automatically to fetch all items. Returns a Promise that resolves to an array of all items.

## Usage/Examples

```javascript
import { DynamoProvider } from "dynamo-db-handler"

// Create an instance of the DynamoProvider class
const dynamoProvider = new DynamoProvider();

// Use async/await to interact with DynamoDB

async function example() {
  // Set the DynamoDB client
  const client = await dynamoProvider.setClient();

  // Use the provided methods to interact with DynamoDB

  // Save an item to DynamoDB
  const putParams = {
    TableName: "YourTableName",
    Item: {
      id: { S: "1" },
      name: { S: "John Doe" },
      age: { N: "30" }
    }
  };

  try {
    const response = await dynamoProvider.save(putParams);
    console.log("Item saved:", response);
  } catch (error) {
    console.error("Error saving item:", error);
  }

  // Update an item in DynamoDB
  const updateParams = {
    TableName: "YourTableName",
    Key: {
      id: { S: "1" }
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: {
      "#name": "name"
    },
    ExpressionAttributeValues: {
      ":name": { S: "Jane Doe" }
    }
  };

  try {
    const response = await dynamoProvider.update(updateParams);
    console.log("Item updated:", response);
  } catch (error) {
    console.error("Error updating item:", error);
  }

  // Perform a bulk write operation on DynamoDB
  const objectsToProcess = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
    // ...
  ];
  const tableName = "YourTableName";

  try {
    const success = await dynamoProvider.bulk(objectsToProcess, tableName);
    console.log("Bulk write operation completed:", success);
  } catch (error) {
    console.error("Error performing bulk write operation:", error);
  }

  // Execute a query on DynamoDB
  const queryCommandInput = {
    TableName: "YourTableName",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id"
    },
    ExpressionAttributeValues: {
      ":id": { S: "1" }
    }
  };

  try {
    const items = await dynamoProvider.query(queryCommandInput);
    console.log("Queried items:", items);
  } catch (error) {
    console.error("Error querying items:", error);
  }

  // Retrieve all items from a DynamoDB table
  const scanParams = {
    TableName: "YourTableName"
  };

  try {
    const items = await dynamoProvider.findAll(scanParams);
    console.log("All items:", items);
  } catch (error) {
    console.error("Error finding all items:", error);
  }
}

example();


```

## Contribution
Contributions are welcome! If you want to improve this package or report any issues, please follow these steps:

#### 1. Fork the repository.

#### 2. Create a new branch 
(git checkout -b feature/feature-name).

#### 3. Make the necessary changes
and commit them (git commit -am 'Add new feature').

#### 4. Push your changes 
to the remote repository (git push origin feature/feature-name).
Open a pull request on GitHub.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE). file for more details.

