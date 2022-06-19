//this script is only for the /cteateDatabase endpoint
//the variable below will be used by that endpoint to allow the backend
//to create all the needed tables if the hosting does not have them created


const createScript = 
`CREATE SEQUENCE IF NOT EXISTS users_id_seq;

CREATE TABLE IF NOT EXISTS users (
	name text COLLATE pg_catalog."default" NOT NULL,
	email text COLLATE pg_catalog."default" NOT NULL,
	id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	CONSTRAINT users_pkey PRIMARY KEY (email),
	CONSTRAINT userid UNIQUE (id),
	CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS credentials (
	user_id INT UNIQUE NOT NULL,
	salt VARCHAR(64) NOT NULL,
	hashed_password VARCHAR(1000) NOT NULL,
	FOREIGN KEY (user_id)
	REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS medication (
	id serial NOT NULL,
	medication text NOT NULL,
	"inUse" boolean NOT NULL DEFAULT true,
	dose character(11),
	freq text,
	notes text,
	"userId" integer NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT userlink FOREIGN KEY ("userId")
		REFERENCES users (id) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
);
`

module.exports = createScript;