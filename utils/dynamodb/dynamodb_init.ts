import { DynamoDBClient, CreateTableCommand, CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { AttributeDefinition, KeySchemaElement, BillingMode, DescribeTableCommand, DeleteTableCommand } from "@aws-sdk/client-dynamodb";

export async function createLocalDynamoDBStreamTable(client: DynamoDBClient, tableName: string): Promise<void> {
    const createTableInput: CreateTableCommandInput = {
        AttributeDefinitions: [
            {
                AttributeName: "ID",
                AttributeType: "S" as AttributeDefinition["AttributeType"],
            },
        ],
        KeySchema: [
            {
                AttributeName: "ID",
                KeyType: "HASH" as KeySchemaElement["KeyType"],
            },
        ],
        TableName: tableName,
        BillingMode: "PAY_PER_REQUEST" as BillingMode,
    };

    try {
        await client.send(new CreateTableCommand(createTableInput));
        console.log(`Table ${tableName} created successfully`);
    } catch (error) {
        console.error(`Error creating table ${tableName}`, error);
        throw error;
    }
}

export async function deleteLocalDynamoDBStreamTable(client: DynamoDBClient, tableName: string): Promise<void> {
    try {
        await client.send(new DescribeTableCommand({ TableName: tableName }));

        await client.send(new DeleteTableCommand({ TableName: tableName }));
        console.log(`Table ${tableName} deleted successfully`);
    } catch (error: any) {
        if (error.name === 'ResourceNotFoundException') {
            console.error(`Table ${tableName} does not exist, no need to delete`);
        } else {
            throw error;
        }
    }
}
