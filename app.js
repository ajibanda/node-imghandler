const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const morgan     = require('morgan');
const cors       = require("cors");
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const formData   = require('express-form-data');
const os         = require('os');

let app     = express();

/**
 * This function is used for logging in console.
 * Should be ignored on testing.
 */
/* istanbul ignore if  */
if(config.util.getEnv('NODE_ENV') !== 'test') {
	app.use(morgan('combined'));
}

/**
 * Solve CORS issue
 */
var corsOptions = {
    origin: "*"					// solve when front end url is fixed
};

/**
 * Limits IP request
 */
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 	// 15 minutes
	max     : 1000 				// limit each IP to 1000 requests per windowMs
});

// options for formData
const optionsFormData = {
  uploadDir: os.tmpdir(),
  autoClean: true
};


// parse data with connect-multiparty. 
app.use(formData.parse(optionsFormData));
app.use(formData.stream());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

app.use("/", require("./route/route"));

app.listen(3001, function () {
  console.log('Image Handler running on 3001!');
});