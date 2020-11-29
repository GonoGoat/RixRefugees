create table Places (
    id  SERIAL PRIMARY KEY,
    nom varchar(20),
    nombre_lit int,
    adresse varchar(60),
    description text
);

create table Equipment (
    id  SERIAL PRIMARY KEY,
    nom varchar(20)
);

create table Users (
	id  SERIAL PRIMARY KEY,
	nom varchar(20),
	prenom varchar(20),
	mail varchar(40),
	isAdmin boolean,
	isActive boolean,
	lastActivity date
);

create table Tasks (
	id  SERIAL PRIMARY KEY,
	nom varchar(40),
	description text,
	isFromAdmin boolean,
	numberOfPeople int
);

create table Accomodations (
	id  SERIAL PRIMARY KEY,
	constraint fk__accomodations_places
		foreign key (id)
			references Places(id),
	constraint fk__accomodations_equipments
		foreign key (id)
			references Equipments(id)
);

create table Registrations (
	id  SERIAL PRIMARY KEY,
	motivation text,
	constraint fk__registrations_users
		foreign key (id)
			references Users(id)
);

create table Availabilities (
	id  SERIAL PRIMARY KEY,
	commentaire text,
	isAssigned boolean,
	isComingFromAdmin boolean,
	constraint fk__availabilities_users
		foreign key (id)
			references Users(id),
	constraint fk__availabilities_tasks
		foreign key (id)
			references Tasks(id)
);

create table Accomodations_availabilities (
	id  SERIAL PRIMARY KEY,
	dispo_debut timestamp(0),
	dispo_fin timestamp(0),
	constraint fk__accomodations_avail_acc
		foreign key (id)
			references Accomodations(id)
);

create table Friends (
	id  SERIAL PRIMARY KEY,
	nom varchar(20),
	prenom varchar(20),
	nationalite varchar(3),
	status int
);

create table Sessions (
	id  SERIAL PRIMARY KEY,
	date_debut date,
	date_fin date,
	constraint fk__sessions_users
		foreign key (id)
			references Users(id),
	constraint fk__sessions_accomodations_avail
		foreign key (id)
			references Accomodations_availabilities(id)
);

create table Sessions (
	id  SERIAL PRIMARY KEY,
	date_debut date,
	date_fin date,
	constraint fk__sessions_users
		foreign key (id)
			references Users(id),
	constraint fk__sessions_accomodations_avail
		foreign key (id)
			references Accomodations_availabilities(id)
);

create table Sessions_tasks (
	id  SERIAL PRIMARY KEY,
	date timestamp(0),
	constraint fk__sessions_tasks_assignments
		foreign key (id)
			references Assignments(id),
	constraint fk__sessions_tasks_sessions
		foreign key (id)
			references Sessions(id)
);

create table Relations (
	id  SERIAL PRIMARY KEY,
	nom_contact varchar(20),
	prenom_contact varchar(20),
	intitule_contact varchar(40),
	telephone char(12),
	adresse varchar(60)
);

create table Web (
	id  SERIAL PRIMARY KEY,
	slug varchar(60),
	title varchar(60),
	content text
);

create table Donations (
	id  SERIAL PRIMARY KEY,
	nom varchar(20),
	prenom varchar(20),
	description text,
	contact text,
	isResolved boolean
);