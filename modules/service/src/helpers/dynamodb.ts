import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as Environment from './Environment';
// import Log from './Log';

export const clientConfiguration = (isOffline: boolean): DynamoDBClientConfig =>
    isOffline
        ? {
              apiVersion: '2012-08-10',
              region: 'localhost',
              endpoint: `http://localhost:8000`,
              //   credentials: {
              //       accessKeyId: 'xxx',
              //       secretAccessKey: 'yyy',
              //   },
          }
        : { apiVersion: '2012-08-10' };

const client = DynamoDBDocument.from(new DynamoDBClient(clientConfiguration(Environment.isOffline())));

export const putObject = <T>(primaryId: string, secondaryId: string, value: T) =>
    client.send(
        new PutCommand({
            TableName: Environment.tableName(),
            Item: {
                primaryId,
                secondaryId,
                ...value,
            },
        }),
    );

export const getObject = <T>(primaryId: string, secondaryId: string): Promise<T> =>
    client
        .send(
            new GetCommand({
                TableName: Environment.tableName(),
                Key: {
                    primaryId,
                    secondaryId,
                },
            }),
        )
        .then((result) => {
            return result.Item as T;
        });
