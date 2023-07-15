import AWS from 'aws-sdk';
import * as Environment from './Environment';
// import Log from './Log';

export const clientConfiguration = (isOffline: boolean): AWS.DynamoDB.ClientConfiguration =>
    isOffline
        ? {
              apiVersion: '2012-08-10',
              region: 'localhost',
              endpoint: `http://localhost:8000`,
              accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
              secretAccessKey: 'DEFAULT_SECRET', // needed if you don't have aws credentials at all in env
          }
        : { apiVersion: '2012-08-10' };

export const getClient = () => {
    const configuration = clientConfiguration(Environment.isOffline());
    return new AWS.DynamoDB(configuration);
};
