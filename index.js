// import express from "express"; // ES6 Modules << this is the React way

const express = require("express"); //CommonJS Modules, << his is the equivalent to the above

const hubsModel = require("./data/hubs-model.js"); //<< require data access

const server = express();

//middleware
//teach express how to read JSON fro the request
server.use(express.json()); // <<<<<< we need this for POST and PUT

server.get("/", (request, response) => {
	// order matters the first argument is the request

	response.send("hello node 22");
});

/* server.get ("/hub", (request, response) => {});  //<< there is no code sending a response. no response here, it will show nothing just loading */

server.get("/hubs", (request, response) => {
	//get a list of hubs from the database
	hubsModel
		.find()
		.then(hubs => {
			//send the list of hubs back to the client
			response.send(hubs);
		})
		.catch(error => {
			response.send(error);
		});
});





//add a hub
server.post("/hubs", (request, response) => {
	//axios.post(url, data)
	// get he hub data from the request

	const hubData = request.body;
	console.log("hub data", hubData);

	// validate the data sent by he client
	// NEVER TRUST THE CLIENT!!!!!
	if (!hubData.name) {
		response.status(400).json({ message: "gimme a name" });
	} else {


		// add the hub to the database
		hubsModel
			.add(hubData)
			.then(hub => {
				//send the hub back to the client
				response.json(hub); //.json()  will set the right headers and convert to JSON
			})
			.catch(error => {
				response.json({ message: "error saving hub" });
            });
            
            
	}
});







//delete a hub
server.delete("/hubs/:id", (request, response) => {
	//axios.delete("/hubs/2")

	const id = request.params.id; // params is an object with all the url parameters

	hubsModel
		.remove(id)
		.then(hub => {
			//send the hub back to the client
			response.json(hub); //.json()  will set the right headers and convert to JSON
		})
		.catch(error => {
			response.json({ message: "error deleting hub" });
		});
});


//updating a hub
server.put("/hubs/:id", (request, response) => {
	//axios.put("/hubs/2")
	const id = request.params.id; // params is an object with all the url parameters
	const changes = request.body;

	hubsModel
		.update(id, changes)
		.then(hub => {
			//send the hub back to the client
			response.json(hub); //.json()  will set the right headers and convert to JSON
		})
		.catch(error => {
			response.json({ message: "error updating hub" });
		});
});

const port = 8000;
server.listen(port, () => console.log(`\n** API on Port $(port) **\n`));

//npm i    //equivalent of yarn install
//npm i express
//npm run server

//visit localhost:8000
