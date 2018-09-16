const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {mongoose} = require('./db/mongoose');
const {Ratings} = require('./models/rate');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {

	let response = "hello";
	res.send(response);

})


app.post('/add', (req, res)=> {
	const rate = new Ratings({
		email : req.body.email,
		lastrate : req.body.lastrate,
		updated : req.body.updated,
		rate: req.body.rate	
	})
	rate.save().then((doc)=>{
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});


app.post('/rating', (req, res)=> {

	Ratings.findOneAndUpdate(
		{
			email: req.body.email
		},
		{
			$set: 
				{
					email : req.body.email,
					lastrate : req.body.lastrate,
					updated : req.body.updated,
					rate: req.body.rate			
				}
		},
		{
			new : true,
			upsert : true,
			runValidators : true
		})
		.then((doc) => {
			console.log("updating ....")
			if (!doc) {
				return res.status(404).send("No update");
			} else {
				console.log("updating complete");
				return doc;
			}
		})
		.then((doc) => {
			Ratings.find().then((doc_all)=>{
				console.log('finding all and push it to the front.')
				res.send(doc_all);
			}, (e) => {
				res.status(400).send(e);
			});
		})
		.catch((e)=> {
			console.log("error catched");
			res.status(400).send(e);
		})
});

app.post('/lastrate', (req, res)=> {
	Ratings.findOneAndUpdate(
		{
			email: req.body.email
		},
		{
			$set: 
				{
					lastrate : req.body.lastrate,
				}
		},
		{
			new : true,
			upsert : true,
		})
		.then((doc) => {
			if (!doc) {
				return res.status(404).send("No update");
			} else {
				return res.send("update complete");
			}
		})
		.catch((e)=> {
			res.status(400).send(e);
		})
});



app.listen(process.env.PORT || 3001, () => {
	console.log(`starting on port ${process.env.PORT || 3001}`);
})



// app.get('/users', (req, res)=> {
// 	Users.find().then((doc)=>{
// 		res.send(doc);
// 	}, (e) => {
// 		res.status(400).send(e);
// 	});
// });


// app.get('/users/:id', (req, res)=> {
// 	var id = req.params.id;

// 	Users.find({email : id}).then((doc)=>{
// 		res.send(doc);
// 	}, (e) => {
// 		res.status(400).send(e);
// 	});
// });


// https://cors-anywhere.herokuapp.com/
