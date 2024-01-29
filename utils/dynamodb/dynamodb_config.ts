import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Función para crear un cliente de DynamoDB configurado para conectarse localmente
function createLocalDynamoDBClient(): DynamoDBClient {
  return new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "local-env",
    credentials: {
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretAccessKey"
    }
  });
}

console.log("Conected to DynamoDB locally");

export const localDynamoDBClient = createLocalDynamoDBClient();

