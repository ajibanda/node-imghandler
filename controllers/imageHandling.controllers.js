const fs           = require('fs');
const path         = require('path');
const imageDataUri = require('image-data-uri');
const tmpFolder    = path.resolve('./') + "/tmp/";

exports.uploadPicture  = (req, res) => {
	let profilePic = req.files.profilepic;
	let picName  = req.body.id;

  	if(!profilePic){
    	res.status(400).send({message: "File could not be blank"});
    	return false;
  	}

	let filePath = profilePic.path;
	let extName  = path.extname(filePath);

    fs.readFile(filePath, (err, data) => {
      	// image name based on profile
      	let newFileName = `${picName}.jpg`;

      	// throw an error if there is a problem with reading the file
      	if(err)  {
			console.log(err)
			res.status(400).send({message: err2});
		};

		fs.writeFile(path.join(tmpFolder, newFileName), data, function(err2){
			if(err2)  {
				console.log(err2)
				res.status(400).send({message: err2});
			};

			res.status(200).send({message: "File Uploaded properly"})
		});

  	});
}

exports.downloadPicture = (req, res) => {
	let picName = req.params.id;

	if(!picName){
    	res.status(400).send({message: "Name could not be blank"});
    	return false;	
	}

	let filepath = path.join(tmpFolder, picName + ".jpg");
	console.log(filepath);
	imageDataUri.encodeFromFile(filepath)
		.then((result) => {
			res.status(200).send({code: 1, data: result})
		})
		.catch((err) => {
			res.status(200).send({code: 0, data: "Image could not be found" })
		});
	
}

