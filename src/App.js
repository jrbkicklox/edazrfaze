import React from 'react';
import logo from './logo.svg';
import './App.css';
import SaisieMessage from './saisieMessage.js';
import AffichageMessages from './affichageMessages.js';

var Message = function (idAuteur, idDestinataire, message, publique){
	this.idAuteur = idAuteur;
	this.idDestinataire = idDestinataire;
	this.message = message;
	this.publique = publique;
}

function App() {
	return (
		<Principal />
	);
}

/**
 * @classdesc	La classe gère	l'historique des messages
 * 								la liste des utilisateurs
 * 				elle affiche	une liste de destinataires
 * 								une zone d'affichage
 * 								une zone de saisie
 */
export default class Principal extends React.Component {
	constructor(props) {
		super(props);
		this.listeUtilisateurs = [{ id: 1, nom: "Kicklox" }, { id: 2, nom: "JRB" }, { id: 3, nom: "visiteur" }];		// liste Utilisateur
		this.state = {
			destinataire: this.getUtilisateur(1),																		// Utilisateur
			auteur: this.getUtilisateur(2),																				// Utilisateur
			historique: [new Message(1, 2, "bienvenue", true)]
		};
	}

	/**
	 * @property {int} id
	 * @returns {Utilisateur}
	 */
	getUtilisateur = (id) => {
		return this.listeUtilisateurs.find(utilisateur => utilisateur.id == id);
	}

	/**
	 * @property {int} id
	 * @returns {Utilisateur}
	 */
	getListeMessages = (id) => {
		var idA = this.state.auteur.id;
		var idD = this.state.destinataire.id;
		return this.state.historique.map(message =>	message.idAuteur == idA && message.idDestinataire == idD ||
													message.idAuteur == idD && message.idDestinataire == idA ||
													message.publique
													? message : null);
	}
  
	/**
	 * @property {string} message
	 * @property {bool} publique
	 */
	ajouterMessage = (message, publique) => {
		var historique = this.state.historique;
		this.state.historique.push(new Message(this.state.auteur.id, this.state.destinataire.id, message, publique));
		this.setState({ historique: historique });
	}

	/**
	 * @property {event} e
	 */
	changeDestinataire = (e) => {
		var destinataire = this.state.destinataire,
		destinataire = e.target.value;
		this.setState({ destinataire: this.getUtilisateur(destinataire) });
	}

	render() {
		const getNomDestinataires = this.listeUtilisateurs.map(util => { return (<option value = {util.id}>{util.nom}</option>); });

		return (
			<div className="App">
				<label>Destinataire : <select onChange = {this.changeDestinataire}>{getNomDestinataires}</select></label>
				<AffichageMessages listeMessages = {this.getListeMessages()} getUtilisateur = {this.getUtilisateur}/>
				<SaisieMessage saisie = {this.ajouterMessage} />
			</div>
		);
	}
}