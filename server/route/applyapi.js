const router = require("express").Router();
const { google } = require("googleapis");

router.post("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    var compname = req.body.datadrive.name;

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "14B4o0Fdj4_PSy3i8dRZ26Wc7d_2aBnqPvF8x2e8bOpE"

    //Getting Values of Master Sheet
    const sheetData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: compname
    })

    //Getting total rows
    const numRows = sheetData.data.values.length;


    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: compname,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [numRows,req.body.userData.name,req.body.userData.enrollment,req.body.userData.contact,req.body.userData.email]
            ]
        }

    })


    res.status(201).send({ message: "Successful" })

})

module.exports = router;