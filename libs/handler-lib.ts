import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export default function handler(lambda) {
    return async (
        event: APIGatewayEvent,
        context: Context
    ): Promise<APIGatewayProxyResult> => {
        let body = undefined;
        let statusCode = undefined;

        try {
            // Run the Lambda
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            body = { error: e.message };
            statusCode = 500;
        }

        // Return HTTP response
        return {
            statusCode,
            body: JSON.stringify(body),
        };
    };
}
