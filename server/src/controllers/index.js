import makeUrl from "../models/index.js";

export const startServer = (req, res) => {
  res.send("Hello World!");
};

export const getUrl = async (req, res, next) => {
  try {
    const uri = req.body.uri;
    const valid = isValidUrl(uri);

    if (!uri || !valid) {
      const err = {
        msg: "invalid or no url",
        status: 400,
      };
      return next(err);
    }

    let a = true;
    let identifier = null;
    while (a) {
      const genRandomStr = Math.random().toString(36).substring(2, 8);
      const searchResult = await makeUrl.findOne({ ident: genRandomStr });
      if (!searchResult) {
        identifier = genRandomStr;
        a = false;
      }
    }
    const url = new makeUrl({
      ident: identifier,
      originalUri: uri,
    });
    const id = await url.save();
    res.status(201).json(id);
  } catch (err) {
    console.log(err);
  }
};

export const fetchShortUri = async (req, res, next) => {
  try {
    const ident = req.params.id;
    const searchResult = await makeUrl.findOne({ ident: ident });
    if (!searchResult) {
      const err = {
        msg: "invalid identifier",
        status: 400,
      };
      return next(err);
    }
    let url = searchResult.originalUri;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    console.log("redirecting to", url);

    res.redirect(url);
  } catch (err) {
    next(err);
  }
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};
