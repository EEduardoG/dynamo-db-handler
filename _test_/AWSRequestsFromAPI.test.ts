// import RequestService from "../src/request_service/RequestService"

// const desciption = "RequestService Test";

// describe(desciption, () => {
//     test("Get Request Parameters from AWS API Event.", async () => {
//         let event: any = {
//             version: '2.0',
//             routeKey: 'POST /reset',
//             rawPath: '/reset',
//             rawQueryString: '',
//             headers: {
//                 'accept-encoding': 'gzip',
//                 authorization: 'eyJraWQiOiJwVDJkbXFodFJGMGJHRHN2SlwvUUs1S3JNS1hONkdUTzVoZHdOcjJXSG5GQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhYTMxOThjNy1iMmUxLTQ2NTMtOTBlZC02MjkyMmQ1YzQzMGEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9zZFAxbWpxdWsiLCJjbGllbnRfaWQiOiI3ZTJibnVwcTJwbzRxajZiNjdiN2VtZWlubyIsIm9yaWdpbl9qdGkiOiIzYmNlNDNlYy1kMjI4LTQ0ODEtOWIzZS1lMTlmODJjNjRkYjciLCJldmVudF9pZCI6ImZiYTk4Y2FjLTMyZGQtNDg3ZS05NzMyLWU5YzcxMmU2NzgyMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2Nzc0MzUzMjAsImV4cCI6MTY3NzUyMTcyMCwiaWF0IjoxNjc3NDM1MzIwLCJqdGkiOiIyYjc3NDIxZS1kYTkzLTQ2ZmItOGE0MS0zMjhjZDYxNjIwNTkiLCJ1c2VybmFtZSI6ImxhbG8zNDN4In0.dB4Vwei_iwO0gTJszkiKfMPLbgP5JuG_O2zdvlVM851htbVADVL842kVeBxm8kaZyIJCOjiNpK2-TN6JePoMQd8hWqNwW9LJCELIXFy1QBhQswWWCpFy2xluKm4fZFYB0kSdRHu79g5szQWxZNMRaKP6YwS0JZOru3bTSO2xv2hdaohL2mCDZPOQQIQAp5EtAVMmfnUAZF32WJHwI4KrvP1zkCVCSISFzI9lEiR2oi8CzkxIBEMqiXtTcQgf8cGAAxhqEAFeOb6RcIHTe2pfOjqDmkg6KlSL9vGNi-qNODJaox97kprHzmaJVZWq0m38xMwxq5ChdCmXfFCBL9NJfw',
//                 'content-length': '58',
//                 'content-type': 'application/json',
//                 host: 'api.cloudsegcontrol.com',
//                 'user-agent': 'okhttp/4.9.2',
//                 'x-amzn-trace-id': 'Root=1-63fba396-3ac8463146582ab316ed692f',
//                 'x-forwarded-for': '187.189.164.245',
//                 'x-forwarded-port': '443',
//                 'x-forwarded-proto': 'https'
//             },
//             queryStringParameters: { ticketId: '80A2' },
//             requestContext: {
//                 accountId: '332426000899',
//                 apiId: '716g00siu3',
//                 domainName: 'api.cloudsegcontrol.com',
//                 domainPrefix: 'api',
//                 http: {
//                     method: 'POST',
//                     path: '/reset',
//                     protocol: 'HTTP/1.1',
//                     sourceIp: '187.189.164.245',
//                     userAgent: 'okhttp/4.9.2'
//                 },
//                 requestId: 'A9Z_jiWooAMEJ4w=',
//                 routeKey: 'POST /reset',
//                 stage: '$default',
//                 time: '26/Feb/2023:18:23:18 +0000',
//                 timeEpoch: 1677435798419
//             },
//             body: null,
//             isBase64Encoded: false
//         }

//         let resp = new RequestService().setEvent(event)

//         try {
//             console.log(resp)
//         } catch (error) {
//             console.log(error)
//         }


//     }, 500)
// })