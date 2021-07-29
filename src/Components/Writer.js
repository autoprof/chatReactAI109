import {useState, useRef} from 'react';

export default Writer;

function Writer (props) {
	var [txt, setTxt] = useState("");
	var inputField = useRef(null);

	function handleClick(e) {
		// envoyer le text
		props.sendText(txt);
		setTxt("");
		inputField.current.focus();
	}

	function handleChange(e) {
		setTxt(e.target.value);
	}

	function handleKeyPress(e) {
		if (e.ctrlKey && txt !== "") {
			props.sendText(txt);
			setTxt("");
		}
	}

	return (
		<div id="writer" className="zone">
			<textarea ref={inputField} value={txt} onChange={handleChange} onKeyPress={handleKeyPress} />
			<button disabled={txt === ""} onClick={handleClick}>valider</button>
		</div>
	);
};
