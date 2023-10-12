// src/MyApp.js
import Table from "./Table";
import Form from './Form';
import React, {useState, useEffect} from 'react';

function MyApp() {
	const [characters, setCharacters] = useState([]);
 
	function removeOneCharacter (index) {
	  const charToRemove = characters[index];
	  fetch(`http://localhost:8000/users/${charToRemove.id}`, {method: 'DELETE' })
	  .then((response) => {
	  if (response.status === 204) {
			const updated = characters.filter((character, i) => i !== index);
			setCharacters(updated);
	  }
	  else if (response.status === 404) {
		 console.error('User not found.');
	  }
	  else {
		console.error('Failed to delete user.');
	  }
	 })
	 .catch((error) => {
            console.error(error);
        });  
	  
	}

	function fetchUsers() {
    		const promise = fetch("http://localhost:8000/users");
    		return promise;
	} 
  	
	function postUser(person) {
    		const promise = fetch("Http://localhost:8000/users", {
      		method: "POST",
      		headers: {
        		"Content-Type": "application/json",
      		},
      		body: JSON.stringify(person),
   		 	});
    		return promise;
		}
  	

	function updateList(person) { 
    	postUser(person)
      		.then((response) => {
			if (response.status === 201) {
				return response.json();
			} else {
				throw new Error('Failed to add user.');
			}
		})
		.then ((addedUser) => { 
			setCharacters([...characters, addedUser]);
		})
      	.catch((error) => {
        	console.log(error);
      	});
	}

	useEffect(() => {
  		fetchUsers()
	  	.then((res) => res.json())
	  	.then((json) => setCharacters(json["users_list"]))
	  	.catch((error) => { console.log(error); });
	}, [] );

  	return (
	<div className="container">
    		<Table characterData={characters}
			removeCharacter={removeOneCharacter} />
  	  <Form handleSubmit={updateList} />
	</div>
  	);
}
export default MyApp;
