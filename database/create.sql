/******************RANGEE N°0************/

create table Accounting (
	id  SERIAL PRIMARY KEY, /*OK*/
	date date NOT NULL default current_date, /*OK*/
	amount decimal not null, /*OK*/
	description text
);

create table Donations (
	id  SERIAL PRIMARY KEY, /*OK*/
	fname varchar(20), /*OK*/
	lname varchar(20), /*OK*/
	description text, /*OK*/
	contact text, /*OK*/
	isResolved boolean NOT NULL default false /*OK*/
);

create table Relations (
	id  SERIAL PRIMARY KEY, /*OK*/
	contact_fname varchar(20), /*OK*/
	contact_lname varchar(20), /*OK*/
	contact_label varchar(40), /*OK*/
	mail varchar(40), /*OK*/
	phone char(12), /*OK*/
	address varchar(60) /*OK*/
);

/******************RANGEE N°1************/

create table Places (
    id  SERIAL PRIMARY KEY,  /*OK*/
    name varchar(20) NOT NULL, /*OK*/
    address varchar(60) NOT NULL, /*OK*/
    description text, /*OK*/
	unique (address,name) /*OK*/
);

create table Equipments (
    id  SERIAL PRIMARY KEY, /*OK*/
    name varchar(20) NOT NULL unique /*OK*/
);

create table Users (
	id  SERIAL PRIMARY KEY, /*OK*/
	password varchar(30) NOT NULL, /*OK*/
	fname varchar(20) NOT NULL, /*OK*/
	lname varchar(20) NOT NULL, /*OK*/
	mail varchar(40) NOT NULL unique, /*OK*/
	isAdmin boolean NOT NULL default false, /*OK*/
	isActive boolean NOT NULL default false,  /*OK*/
	lastActivity date NOT NULL default current_date, /*OK*/
	contact text /*OK*/
);

create table Tasks (
	id  SERIAL PRIMARY KEY, /*OK*/
	name varchar(40) NOT NULL /*OK*/
);

create table Status (
	id  SERIAL PRIMARY KEY, /*OK*/
	name varchar(40) NOT NULL unique /*OK*/
);

/******************RANGEE N°2************/
create table Web (
	slug varchar(60) PRIMARY KEY, /*OK*/
	title varchar(60) NOT NULL, /*OK*/
	content text, /*OK*/
	last_change timestamp(0) without time zone NOT NULL default current_date,

	users_id int,
	constraint fk__users__id /*OK*/
		foreign key (users_id)
			references Users(id)
			on Delete set null
);

create table Accomodations (
	id  SERIAL PRIMARY KEY, /*OK*/

	places_id int,
	constraint fk__places__id /*OK*/
		foreign key (places_id)
			references Places(id)
			on Delete Cascade,
	equipments_id int,
	constraint fk__equipments__id /*OK*/
		foreign key (equipments_id)
			references Equipments(id)
			on Delete Cascade
);

create table Registrations (
	id  SERIAL PRIMARY KEY, /*OK*/
	motivation text, /*OK*/

	users_id int,
	constraint fk__users__id /*OK*/
		foreign key (users_id)
			references Users(id)
			on Delete Cascade
);

create table Friends (
	id  SERIAL PRIMARY KEY, /*OK*/
	fname varchar(20), /*OK*/
	lname varchar(20), /*OK*/
	nationality varchar(3), /*OK*/
	notes text, /*OK*/
	birth_date date, /*OK*/
	in_date date NOT NULL default current_date, /*OK*/
	out_date date, /*OK*/
	phone char(12), /*OK*/

	status_id int,
	constraint fk__status__id /*OK*/
		foreign key (status_id)
			references Status(id)
			on Delete set null
);

/******************RANGEE N°3************/

create table Appointments (
	id  SERIAL PRIMARY KEY, /*OK*/
	appointment date NOT NULL, /*OK*/
	description text,
	isCanceled boolean NOT NULL default false,

	status_id int,
	constraint fk__status__id /*OK*/
		foreign key (status_id)
			references Status(id)
			on Delete set null,
	friends_id int,
	constraint fk__friends__id /*OK*/
		foreign key (friends_id)
			references Friends(id)
			on Delete cascade
);

create table Places_availabilities (
	id  SERIAL PRIMARY KEY, /*OK*/
	start_avail timestamp(0) without time zone NOT NULL, /*OK*/
	end_avail timestamp(0) without time zone NOT NULL, /*OK*/
	bed_quantity int default 0 NOT NULL, /*OK*/

	places_id int,
	constraint fk__Places__id /*OK*/
		foreign key (places_id)
			references Places(id)
			on delete set null
);

/******************RANGEE N°4************/

create table Sessions (
	id  SERIAL PRIMARY KEY, /*OK*/
	start_date date NOT NULL, /*OK*/
	end_date date NOT NULL, /*OK*/

	users_id int,
	constraint fk__users__id /*OK*/
		foreign key (users_id)
			references Users(id)
			on Delete set null,
	places_availabilities_id int,
	constraint fk__places_availabilities__id /*OK*/
		foreign key (places_availabilities_id)
			references Places_availabilities(id)
			on Delete set null
);

/******************RANGEE N°5************/

create table Sessions_tasks (
	id  SERIAL PRIMARY KEY, /*OK*/
	isFromAdmin boolean NOT NULL default true, /*OK*/
	description text, /*OK*/
	amountOfPeople int NOT NULL default 0, /*OK*/
	start_date timestamp(0) without time zone default current_date,
	end_date timestamp(0) without time zone,

	tasks_id int,
	constraint fk__tasks__id /*OK*/
		foreign key (tasks_id)
			references Tasks(id)
			on Delete cascade,
	sessions_id int,
	constraint fk__sessions__id /*OK*/
		foreign key (id)
			references Sessions(id)
			on Delete set null
);

/******************RANGEE N°6************/

create table Availabilities (
	id  SERIAL PRIMARY KEY, /*OK*/
	description text, /*OK*/
	isCanceled boolean NOT NULL default false,

	users_id int,
	constraint fk__users__id /*OK*/
		foreign key (id)
			references Users(id)
			on Delete cascade,
	sessions_tasks_id int,
	constraint fk__session_tasks__id /*OK*/
		foreign key (id)
			references Sessions_tasks(id)
			on Delete cascade
);

/******************RANGEE N°7************/

create table Assignments (
	id SERIAL PRIMARY KEY, /*OK*/
	feedback text,

	friends_id int,
	constraint fk__friends__id /*OK*/
		foreign key (id)
			references Friends(id)
			on Delete cascade,
	availabilities_id int,
	constraint fk__availabilities__id /*OK*/
		foreign key (availabilities_id)
			references Availabilities(id)
			on Delete cascade
);