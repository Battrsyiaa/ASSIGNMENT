//const bcrypt = require("bcryptjs");
let user = [];

class User {
	static async injectDB(conn) {
		user = await conn.db("UtemGateSystem").collection("User")
	}

	//Register new account
	static async register(name, number, carplate) {
		// TODO: Check if name exists
		let usersearch = await user.find({ name : name }).toArray()
			if (usersearch.length > 0) {
				return null
			}
			else {
				//TODO : Save username to database
				await user.insertOne({
					name : name, 
					number : number,
					carplate : carplate
				})
			}

			let result = await user.find({name : name}).toArray();
			return result
	};

	static async delete (name) {
		//TODO : Check if carplate exist
		let usersearch = await user.find({name : name}).toArray();
		console.log(usersearch);
			if (usersearch.length == 0) {
				return null
			}
			else {
				await user.deleteOne({name:name});
				return usersearch
			}
	};

	static async update(name, number, carplate) {
		let usersearch = this.search(name);
			if (usersearch.length ==0) {
			return null
		}
		else {
			await user.updateOne(
				{name : name},{$set: {number:number, carplate:carplate}
			});
			return usersearch 
			}
		};

	static async search(name) {
		//TODO : Check if carplate exist
		let usersearch = await user.find({ name : name}).toArray();
		console.log(usersearch);
			if (usersearch.length == 0) {
				return null
			}
			else {
				return usersearch
			}
	};

	static async getAll(name) {
		let usersearch = await user.find({ name : name }).project({_id:0}).toArray();
			if (usersearch.length == 0 ) {
				return null
			}
			else {
				return usersearch
			}
		}
};
	module.exports = User;