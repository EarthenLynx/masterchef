const path = require("path");
const fs = require("fs"); 

const galleryPath = path.resolve(__dirname, "../public/img/");

const saveImgTemp = function (req) {
  let tempImgUrl = path.join(galleryPath, "/tmp/temp.png");

  let base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");

  fs.unlink(tempImgUrl, (err) => {
    console.log(err);
    fs.appendFile(tempImgUrl, base64Data, "base64", function (err) {
      console.log(err);
    });
  });
};

module.exports = saveImgTemp; 