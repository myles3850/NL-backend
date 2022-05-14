CREATE TABLE public.medication
(
    id serial NOT NULL,
    medication text NOT NULL,
    "inUse" boolean NOT NULL DEFAULT true,
    dose character(11),
    freq text,
    notes text,
    "userId" integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT userlink FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
