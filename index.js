const fetch = require('node-fetch');

async function getData() {
    const data = JSON.stringify({
        query: `
        {
          proposals 
            {
              id
              title
              end
            }`
    });

    const response = await fetch(
        'https://hub.snapshot.org/graphql?operationName=Proposals&query=query%20Proposals%20%7B%0A%20%20proposals(where%3A%20%7Bspace_in%3A%20%5B%223.spaceshot.eth%22%5D%20%2Cstart_gte%3A0%7D)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20end%0A%20%20%7D%0A%7D%0A%20%20', {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'User-Agent': 'Node',
            },
        }
    );


    const json = await response.json(); {
        var lastTimestamp = json.data.proposals[0].end

        var obj = {
            NewProposals: 0,
            proposalsId: [],
            expireTimeStamp: []
        };

        for (let index = 0; index < json.data.proposals.length; index++) {
            if (json.data.proposals[index].end > lastTimestamp) {
                obj.proposalsId.push(
                    json.data.proposals[index].id
                );
                obj.NumberOfProposals++;
                obj.expireTimeStamp.push(
                    json.data.proposals[index].end
                )
            }

        }
    }
    var lastjson = JSON.stringify(obj);


    console.log(lastjson);


}


getData();
























// const { Requester, Validator } = require('@chainlink/external-adapter')

// // Define custom error scenarios for the API.
// // Return true for the adapter to retry.
// const customError = (data) => {
//     if (data.Response === 'Error') return true
//     return false
// }

// // Define custom parameters to be used by the adapter.
// // Extra parameters can be stated in the extra object,
// // with a Boolean value indicating whether or not they
// // should be required.
// const customParams = {
//     start_gte: ['start_gte'],

// }


// const createRequest = (input, callback) => {
//     // The Validator helps you validate the Chainlink request data
//     const validator = new Validator(callback, input, customParams)
//     const jobRunID = validator.validated.id
//     const start_gte = validator.validated.data.start_gte


//     const query = `query Proposals {
//       proposals(where: { space_in: ["3.spaceshot.eth"], start_gte: "${ start_gte }" }) {
//           id
//       }
//   }`


//     // This is where you would add method and headers
//     // you can add method like GET or POST and add it to the config
//     // The default is GET requests
//     // method = 'get' 
//     // headers = 'headers.....'
//     // Axios config
//     const config = {
//         url: 'https://hub.snapshot.org/graphql',
//         method: 'POST',
//         data: { query }
//     }

//     // The Requester allows API calls be retry in case of timeout
//     // or connection failure
//     Requester.request(config, customError)

//     .then(response => {
//             response.data = response.data.data
//                 // It's common practice to store the desired value at the top-level
//                 // result key. This allows different adapters to be compatible with
//                 // one another.
//             response.data.result = Requester.validateResultNumber(response.data, ["proposals", 0, "id"])
//             callback(response.status, Requester.success(jobRunID, response))
//         })
//         .catch(error => {
//             callback(500, Requester.errored(jobRunID, error))
//         })
// }

// // This is a wrapper to allow the function to work with
// // GCP Functions
// exports.gcpservice = (req, res) => {
//     createRequest(req.body, (statusCode, data) => {
//         res.status(statusCode).send(data)
//     })
// }

// // This is a wrapper to allow the function to work with
// // AWS Lambda
// exports.handler = (event, context, callback) => {
//     createRequest(event, (statusCode, data) => {
//         callback(null, data)
//     })
// }

// // This is a wrapper to allow the function to work with
// // newer AWS Lambda implementations
// exports.handlerv2 = (event, context, callback) => {
//     createRequest(JSON.parse(event.body), (statusCode, data) => {
//         callback(null, {
//             statusCode: statusCode,
//             body: JSON.stringify(data),
//             isBase64Encoded: false
//         })
//     })
// }

// // This allows the function to be exported for testing
// // or for running in express
// module.exports.createRequest = createRequest;