import './App.css';
import {useEffect, useState} from 'react';
import Messages from "./Components/Messages";
import Rooms from "./Components/Rooms";
import Users from "./Components/Users";
import Writer from "./Components/Writer";

//~ var users = [];
//~ for(let i = 0; i < 100; i++)
	//~ users.push({
		//~ id: "other-" + (i + 1),
		//~ email: `abcedf-${i}@jklmnop.com`,
		//~ online: Math.random() > 0.5,
	//~ });


var me = "abcedf@jklmnop.com";
var j = 0;




// Hook pour les faux messages
function useFakeMessages(messages, setMessages) {
	useEffect(() => {
		var uniqueId = setInterval(() => {
			var froms = ['Seth', 'Eve', 'Adama'];
			setMessages(messages.concat([{
				id: ++j,
				from: `${froms[j % 3]}@eden.com`,
				date: "2021/09/11 01:01:01",
				text: `text-${j}`,
			}]));
		}, 1000);
		return () => {
			clearInterval(uniqueId);
		};
	}, [messages, setMessages]);
}


// Hook pour les requetes
function useFetch(url, callback) {
	useEffect(() => {
		fetch(url).then(f => f.json()).then(callback);
	}, [url]);
}


function App() {
	var [messages, setMessages] = useState([]);
	var [users, setUsers] = useState([{id: 1000, email: me}]);

	function addMessage(txt) {
		setMessages(messages.concat([{
			id: "me-" + messages.length,
			userId: 1000,
			date: "2021/09/11 01:01:01",
			text: txt,
		}]));
	}

	useFetch("https://jsonplaceholder.typicode.com/users", us => setUsers(users.concat(us)));
	useFetch("https://jsonplaceholder.typicode.com/posts", d => setMessages(d.map(m => ({...m, text: m.body, date: "2021/09/11 01:01:01"}))));

	// useFakeMessages(messages, setMessages);

	return (
		<>
			<Rooms />
			<main id="main" className="zone">
				<Messages messages={users.length ? messages : []} users={users} me={me} />
				<Writer sendText={addMessage} />
			</main>
			<Users users={users} />
		</>
	);
}

export default App;
