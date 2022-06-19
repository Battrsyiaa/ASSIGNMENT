const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.yn2d1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 2407

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Get/Read
app.get('/get', async (req, res) => {
	console.log(req.body)
	const search = await User.search(req.body.id);
	if (search !=null){
		console.log("Id found!")
		res.status(200).json({
			name: search[0].name,
			number: search[0].number,
			carplate: search[0].carplate
		})
	}
	else{
		console.log("Id not found!")
		res.status(404).json()
	}
});

//Post/Create
app.post('/new', async (req, res) => {
	console.log(req.body)
	const username = await Username.register(req.body.name, req.body.number, req.body.carplate);
	if ( username != null ) {
		console.log("Username registered");
		res.status(200).json({
			name: username[0].name,
			number: username[0].number,
			carplate: username[0].carplate
		})
	}
	else {
		console.log("User not registered");
		res.status(401).send({
			error: "User not registered"
		})
	}
});

//Delete/Delete
app.delete('/delete', async (req, res) => {
	console.log(req.body)
	const user = await User.delete(req.body.name);
	if (user != null) {
		console.log ("Username deleted");
		res.status(200).json({
			message: "Account with this username will deleted.",
			name: user[0].name,
			number: user[0].number,
			carplate: user[0].carplate
		})
	}
	else{
		console.log("User not found");
		res.status(404).json({
			message: "No account will deleted."
		})
	}
	//res.json(username);
});

//Patch/Update
app.patch('/update', async (req, res) => {
	console.log(req.body)
	const user = await User.update(req.body.name, req.body.number, req.body.carplate);
	if (user != null) {
		console.log("Username updated")
		res.status(200).json({
			message: "This account username's details will updated.",
			name: user[0].name,
			number: user[0].number+ " to " +req.body.number,
			carplate: user[0].carplate+ " to "+req.body.carplate
		})
	}
	else {
		console.log("Username not found.");
		res.status(404).json({
			message: "No username updated."
		})
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})