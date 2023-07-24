import { BatchWriteItemCommand, DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput, PutItemCommandOutput, QueryCommand, QueryCommandInput, ScanCommand, ScanCommandInput, UpdateItemCommand, UpdateItemCommandInput, UpdateItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import * as dotenv from 'dotenv'


const defaultError = {
    code: "DATABASE_ERROR",
    body: "Database error. Please contact your administrator.",
    exceptionCode: "BAD_REQUEST"
}

export default class DynamoProvider {

    constructor() {

    }

    setClient(): DynamoDBClient {
        dotenv.config()
        const {
            AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY,
            AWS_SESSION_TOKEN,
            AWS_REGION
        } = process.env


        const dynamoClient =
            AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY ?
                new DynamoDBClient({
                    region: AWS_REGION,
                    credentials: {
                        accessKeyId: AWS_ACCESS_KEY_ID,
                        secretAccessKey: AWS_SECRET_ACCESS_KEY,
                        sessionToken: AWS_SESSION_TOKEN
                    },


                }) : new DynamoDBClient({
                    region: AWS_REGION
                })

        return dynamoClient
    }

    async save(params: PutItemCommandInput): Promise<PutItemCommandOutput> {
        try {
            let client = await this.setClient();
            let response: any = await client.send(new PutItemCommand(params))
            return response
        } catch (error: any) {
            console.log(error)
            const err = defaultError
            throw { error: err, errorTrace: error }
        }
    }

    async update(params: UpdateItemCommandInput): Promise<UpdateItemCommandOutput> {

        try {

            let client = await this.setClient();
            let response: any = await client.send(new UpdateItemCommand(params))
            return response

        } catch (error) {
            console.log(error)
            const err = defaultError
            throw { error: err, errorTrace: error }
        }

    }

    async bulk(objectsToProcess: Array<any>, tableName: string): Promise<Boolean> {
        let transactions: any = [];
        let client = this.setClient()
        for (const register of objectsToProcess) {
            let object = {
                "PutRequest": {
                    "Item": marshall(register)
                }
            }
            transactions.push(object)
        }

        let chuncks: any = []
        const chunkSize = 25;
        for (let i = 0; i < transactions.length; i += chunkSize) {
            const chunk = transactions.slice(i, i + chunkSize);
            // do whatever
            chuncks.push(chunk)
        }

        let batchs: any = []
        for (const chunk of chuncks) {
            let batch = {
                [tableName]: chunk
            }
            batchs.push(batch)
        }

        for (const batch of batchs) {
            try {
                let resp = await client.send(new BatchWriteItemCommand({
                    RequestItems: batch
                }))
                console.log(resp)
            } catch (error) {
                console.log(error)
                const err = defaultError
                throw { error: err, errorTrace: error }
            }
        }

        return true
    }

    async query(queryCommandInput: QueryCommandInput): Promise<Array<any>> {

        try {
            const response: any = await this.setClient().send(new QueryCommand(queryCommandInput))
            let items: any = []
            if (response.Items.length > 0) {
                for (const item of response.Items) {
                    items.push((unmarshall(item)))
                }
            }
            return items
        } catch (error) {
            console.log(error)
            const err = defaultError
            throw { error: err, errorTrace: error }
        }

    }

    async get(getItemCommandInput: GetItemCommandInput): Promise<any> {
        try {
            let response: any = await this.setClient().send(new GetItemCommand(getItemCommandInput))

            if (response.Item) {
                response = unmarshall(response.Item)
                return response
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            const err = defaultError
            throw { error: err, errorTrace: error }
        }
    }

    async findAll(params: ScanCommandInput): Promise<Array<any>> {

        const find = async (dbParams: ScanCommandInput, lastEvalatuedKey: any = "") => {

            if (lastEvalatuedKey != "") {
                typeof lastEvalatuedKey == "string" ? dbParams.ExclusiveStartKey = JSON.parse(lastEvalatuedKey) :
                    dbParams.ExclusiveStartKey = lastEvalatuedKey.key
            }

            try {
                let client = await this.setClient();
                let response: any = await client.send(new ScanCommand(dbParams))
                let elements: any = [];
                response.Items.forEach((element: any) => elements.push(unmarshall(element)));
                if (response?.LastEvaluatedKey) {
                    return { elements, pagination: { key: response.LastEvaluatedKey } };
                }
                return elements;
            } catch (error: any) {
                throw error;
            }
        }

        try {

            let elements: any = []
            let pagination: any = ""
            let condition = true;

            do {

                let resp = await find(params, pagination)
                pagination = resp?.pagination ? resp?.pagination : ""
                condition = resp?.pagination ? true : false

                if (resp?.pagination) {
                    elements = elements.concat(resp.elements);
                } else {
                    elements = elements.concat(resp);
                }

            } while (condition);

            return elements

        } catch (error) {
            console.log(error)
            const err = defaultError
            throw { error: err, errorTrace: error }
        }

    }

}


