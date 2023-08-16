const router = require("express").Router();
const { google } = require("googleapis");

router.post("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    var compname = req.body.name;

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "14B4o0Fdj4_PSy3i8dRZ26Wc7d_2aBnqPvF8x2e8bOpE"


    //Getting Values of Master Sheet
    const sheetData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Master Company Sheet"
    })

    //Getting total rows
    const numRows = sheetData.data.values.length;

    //Adding Drive Name to Master Sheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Master Company Sheet",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [numRows, compname, req.body.profile, req.body.ctc, req.body.location, req.body.year]
            ]
        }
    })

    // Adding Company/Drive Sheet
    await googleSheets.spreadsheets.batchUpdate({
        auth,
        spreadsheetId,
        resource: {
            requests: [
                {
                    addSheet: {
                        properties: {
                            title: compname
                        }
                    }
                }
            ]
        }
    })

    // Adding Header of Latest Drive Sheet Created
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: compname,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                ['S. No', "Name", "Enrollment No", "Contact", "Email", "Attendance"]
            ]
        }

    })

    // await googleSheets.spreadsheets.values.append({
    //     auth,
    //     spreadsheetId,
    //     range: compname,
    //     valueInputOption: "USER_ENTERED",
    //     resource: {
    //         values: [
    //             ["S. No", "Name", "Enrollment", "Contact", "Email"],
    //             ["1", "Kavya", "1234", "7654", "nhgfdcv"],
    //             ["2", "Kavya", "12345", "3456", "Emgfvbail"]
    //         ]
    //     }

    // })


    res.status(201).send({ message: "Successful" })

})

module.exports = router;