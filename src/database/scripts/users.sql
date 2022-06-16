-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE SEQUENCE users_id_seq;

CREATE TABLE IF NOT EXISTS users
(
    name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    CONSTRAINT users_pkey PRIMARY KEY (email),
    CONSTRAINT userid UNIQUE (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;