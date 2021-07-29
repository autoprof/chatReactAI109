
export default Users;

function Users (props) {
	return (
		<div id="users" className="zone">
			{ props.users.map( u => <User key={u.id} user={u} /> ) }
		</div>
	);
};


function User(props) {
	return (
		<div className="user">
			<i className={`fas fa-phone-${props.user.online ? 'alt' : 'slash'}`}></i>
			<span>{props.user.email}</span>
		</div>
	);
}