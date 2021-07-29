import {useEffect, useRef, useState} from 'react';

export default Messages;

function Messages (props) {

	var zone = useRef(null);
	var [isDown, setIsDown] = useState(true);

	var users = {};
	for (let u of props.users)
		users[u.id] = u;

	useEffect(function () {
		if ( isDown )
			zone.current.scrollTop = zone.current.scrollHeight;
	});

	function handleScroll(e) {
		if ( zone.current.scrollTop + zone.current.clientHeight + 10 < zone.current.scrollHeight )
			setIsDown(false);
		else setIsDown(true);
	}

	return (
		<div ref={zone} id="messages" className="zone" onWheel={handleScroll}>
			{ props.messages.map( msg => <Message key={msg.id} message={msg} me={props.me} users={users} /> ) }
		</div>
	);
};

function Message(props) {
	console.log(props.users)
	console.log(props.message)
	return (
		<div className={`message ${props.users[props.message.userId].email === props.me ? 'me' : ''}`}>
			<span className="date">{props.message.date} - {props.message.id}</span>
			<span className="from">{props.users[props.message.userId].email}</span>
			<p className="text">{props.message.text}</p>
		</div>
	);
}