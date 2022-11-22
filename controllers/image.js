const Clarifai = require('clarifai');
const { request, response } = require('express');



const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API
})

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("unable to work with api")
        })
}



const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(404).json("unable to get entries", err.message))
}


//! Holding on to this code while figuring out backend api call.
// handleApiCall = (req, res, fetch) => {
//     const raw = JSON.stringify({
//         "user_app_id": {
//             "user_id": 'bzb0xw4yumac',
//             "app_id": 'ZTM-Face-Recognition'
//         },
//         "inputs": [
//             {
//                 "data": {
//                     "image": {
//                         "url": req.body.input
//                     }
//                 }
//             }
//         ]
//     });
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Key ' + '01ba72f5e58f4a4b8afa0f86439cf98f'
//         },
//         body: raw
//     };

//     fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + "6dc7e46bc9124c5c8824be4822abe105" + "/outputs", requestOptions)
//         .then(response => response.json())
// };

module.exports = {
    handleImage,
    handleApiCall
}