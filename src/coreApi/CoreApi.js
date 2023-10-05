import config from "../config/config";
import history from "../Utilities/history";
import store from "../redux/store";
import AWS from "aws-sdk";
const env = process.env.REACT_APP_ENV || "qa";

AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AKIA3E43MGUFXINACTVJ",
    secretAccessKey: "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"
});
var s3Client = new AWS.S3();

export default class CoreApi {
  
  static CoreApiToken(url, method = "GET", data) {
    let BASE_URL = config[env].API_URL;
    const token=store.getState().token;
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method: method || "GET",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization : `Bearer ${token}`
        },
      })
        .then((response) => {
          // response only can be ok in range of 2XX
          if (response.ok) {
            resolve(response.json());
          } else {
            //handle errors in the way you want to

            switch (response.status) {
              case 404:
                console.log("Object not found");
                break;
              case 403:
                history.push("/login");
                break;
              case 500:
                console.log("Internal server error");
                break;
              default:
                console.log("Some error occurred");
                break;
            }

            response.json().then((json) => {
              return reject(json);
            });
          }
        })
        .catch((error) => {
          //it will be invoked mostly for network errors
          //do what ever you want to do with error here
          console.log(error);
          reject("Error");
        });
    });
  }
 
  static user = null;

  static call(url, method = "GET", data) {
    let BASE_URL = config[env].API_URL;

    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method: method || "GET",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
      })
        .then((response) => {
          // response only can be ok in range of 2XX
          if (response.ok) {
            resolve(response.json());
          } else {
            //handle errors in the way you want to

            switch (response.status) {
              case 404:
                console.log("Object not found");
                break;
              case 403:
                history.push("/login");
                break;
              case 500:
                console.log("Internal server error");
                break;
              default:
                console.log("Some error occurred");
                break;
            }

            response.json().then((json) => {
              return reject(json);
            });
          }
        })
        .catch((error) => {
          //it will be invoked mostly for network errors
          //do what ever you want to do with error here
          console.log(error);
          reject("Error");
        });
    });
  }

  static uploadFolder(bucketName, folderName) {
    return new Promise((resolve, reject) => {
      var fparams = { Bucket: bucketName, Key: folderName, Body:'body does not matter' };
      s3Client.upload(fparams, function (err, data) {
        if (err) {
          reject("Error creating the folder: ", err);
        } else {
          console.log("Successfully created a folder on S3");
          resolve(data);
        }
      });
    });
  }

  static uploadFileToS3(bucketName, fileName, fileContent) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
      };

      var upload = s3Client
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
          // File uploading progress
          console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
          resolve(evt);
      })
      .promise();

      upload.then((err, data) => {
          console.log(err);
          reject(err);
      });
    });
  }
}

