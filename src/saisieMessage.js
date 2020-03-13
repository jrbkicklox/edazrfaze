import React from 'react';
import { render } from '@testing-library/react';

export default class SaisieMessage extends React.Component {
	constructor(props) {
		super(props);
		this.envoyer = this.envoyer.bind(this);
		this.texte = "";
	}

	/**
	 * @property {event} e
	 */
	saisieTexte = (e) => {
		this.texte = e.target.value;
	}

	/**
	 * @property {event} e
	 */
	setPublic = (e) => {
		this.public = e.target.checked;
	}

	/**
	 * @description fait remonter à App le texte saisie
	 */
	envoyer() {
		this.props.saisie(this.texte, this.public);
	}

	render() {
		return (
			<div className = "zoneSaisie">
				<textarea className = "champsSaisie" onChange={this.saisieTexte}/>
				<input type = "button" value = "Envoyer" className = "boutonEnvoieMessage" onClick={this.envoyer} />
				<label>Public : <input type = "checkbox" onChange = {this.setPublic} /></label>
			</div>
		);
	}
}