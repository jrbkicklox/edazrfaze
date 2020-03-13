import React from 'react';
import { render } from '@testing-library/react';

export default class AffichageMessages extends React.Component {
	render() {
		const messages = this.props.listeMessages.map((msg, i) => {
			if (!msg)
				return;
			var utilisateur = this.props.getUtilisateur(msg.idAuteur);						// Utilisateur
			return (<div key = {i} className = {"message "+ utilisateur.nom}>
						<div className = "nomUtilisateur">{utilisateur.nom}</div>
						<div className = "msg">{msg.message}</div>
					</div>);
		});
	
		return (
			<div className = "zoneAffichage">
				{messages}
			</div>
		);
	}
}