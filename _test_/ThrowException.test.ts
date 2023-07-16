// import { IException } from "../src/interfaces/IException";
// import { ExceptionCode } from "../src/interfaces/IException";
// const desciption = "Throw exception with ResponseService Format";

// describe(desciption, () => {


//     test("Success Response", async () => {
//         const responseInstance = new ResponseService()
//         let resp = responseInstance.responseSuccess()
//         console.log(resp)
//     }, 500)

//     test("Success Response with data", async () => {
//         const responseInstance = new ResponseService()
//         let resp = responseInstance.responseSuccess({ code: "THIS_SUCCES", data: [{ success: true }] })
//         console.log(resp)
//     }, 500)

//     test("Unhandled error", async () => {

//         const functionWithError = () => {
//             const responseInstance = new ResponseService()
//             let resp: any = undefined;

//             try {
//                 throw Error("Unhandled Error.")
//             } catch (error) {
//                 resp = responseInstance.setException(error)
//             }

//             console.log(resp)
//         }

//         functionWithError()

//     }, 500)

//     test("handled error", async () => {

//         const functionWithError = () => {
//             const responseInstance = new ResponseService()
//             let resp: any = undefined;

//             try {
//                 let error: IException = {
//                     code: "CUSTOM_CODE_ERROR",
//                     body: "This is a custom error.",
//                     exceptionCode: ExceptionCode.BAD_REQUEST
//                 }

//                 throw error;
//             } catch (error) {
//                 resp = responseInstance.setException(error)
//             }

//             console.log(resp)
//         }

//         functionWithError()

//     }, 500)
// })