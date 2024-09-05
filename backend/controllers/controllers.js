import userModel from "../models/model.js";
import {nanoid} from "nanoid";

export async function shortBigUrl(req, res) {
    const requestedUrl = req.body.url;
    const uniqueId = nanoid(10);
    
    const checkUrlinDb = await userModel.findOne({ "url": requestedUrl });

    if (checkUrlinDb) {
        res.status(409).send("Url already Exists, Shorten another one");
    }

    else {
        try {
            const newInstance = new userModel({ "originalUrl": requestedUrl, "shortedUrl": uniqueId });
        await newInstance.save();
        res.status(201).json({
            "message": "Shorted URL generated Successfully",
            "shortedUrl": `http://localhost:5252/shortUrl/${uniqueId}`
        })
        }
        catch (err) {
            console.log("error: " + err);
        }
    }
    // console.log(requestedUrl);
    // res.send("Hello we got a response");
}

export async function getBigUrlFromShortUrl(req, res) {
    const requestUrl = req.params.shortUrl;

    console.log(requestUrl);
    // console.log(req.params);

    const checkShortUrl = await userModel.findOne({ "shortedUrl": requestUrl });
    console.log(checkShortUrl);

    if (checkShortUrl) {
        res.redirect(checkShortUrl.originalUrl);
    }
    else {
        res.send(409).json({ "warning": "your URL is not Correct" });
    }
}

