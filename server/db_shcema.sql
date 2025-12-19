--
-- PostgreSQL database dump
--

\restrict m4qfeWn7FdSDJk7IKPKGG36GxgbYBaxnBSIbiUeayvP0KKQnSnHu1f4whzHZAkQ

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_categories_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_category_types_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_categories_id_fk;
DROP TRIGGER IF EXISTS update_timestamp_trigger ON public.users;
DROP TRIGGER IF EXISTS update_timestamp_trigger ON public.transactions;
DROP TRIGGER IF EXISTS update_timestamp_trigger ON public.category_types;
DROP TRIGGER IF EXISTS update_timestamp_trigger ON public.categories;
DROP INDEX IF EXISTS public.users_email_uindex;
DROP INDEX IF EXISTS public.transactions_user_id_category_id_amount_index;
DROP INDEX IF EXISTS public.transactions_user_id_amount_index;
DROP INDEX IF EXISTS public.transactions_category_id_amount_index;
DROP INDEX IF EXISTS public.category_types_id_kind_uindex;
DROP INDEX IF EXISTS public.categories_category_type_id_name_user_id_uindex;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pk;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_pk;
ALTER TABLE IF EXISTS ONLY public.category_types DROP CONSTRAINT IF EXISTS category_types_pk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pk;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.transactions;
DROP TABLE IF EXISTS public.category_types;
DROP TABLE IF EXISTS public.categories;
DROP FUNCTION IF EXISTS public.set_updated_at_timestamp();
DROP TYPE IF EXISTS public.category_type;
DROP EXTENSION IF EXISTS "uuid-ossp";
--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: category_type; Type: TYPE; Schema: public; Owner: sqladmin
--

CREATE TYPE public.category_type AS ENUM (
    'INCOME',
    'EXPENSE',
    'BALANCE_ARRANGEMENT'
);


ALTER TYPE public.category_type OWNER TO sqladmin;

--
-- Name: set_updated_at_timestamp(); Type: FUNCTION; Schema: public; Owner: sqladmin
--

CREATE FUNCTION public.set_updated_at_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.updated_at IS NULL OR NEW.updated_at = OLD.updated_at::timestamp without time zone THEN
        NEW.updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_updated_at_timestamp() OWNER TO sqladmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: sqladmin
--

CREATE TABLE public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    parent_id uuid,
    user_id uuid NOT NULL,
    name character varying(64) NOT NULL,
    goal_amount numeric(24,8),
    goal_target_date timestamp without time zone,
    category_type_id uuid NOT NULL
);


ALTER TABLE public.categories OWNER TO sqladmin;

--
-- Name: category_types; Type: TABLE; Schema: public; Owner: sqladmin
--

CREATE TABLE public.category_types (
    id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    kind character varying(64) NOT NULL
);


ALTER TABLE public.category_types OWNER TO sqladmin;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: sqladmin
--

CREATE TABLE public.transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id uuid NOT NULL,
    category_id uuid NOT NULL,
    "when" timestamp without time zone DEFAULT now() NOT NULL,
    amount numeric(24,8) DEFAULT 0 NOT NULL,
    descriptin character varying(1024)
);


ALTER TABLE public.transactions OWNER TO sqladmin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: sqladmin
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    email character varying(64) NOT NULL,
    password_hash character varying(254),
    name character varying(64) NOT NULL,
    lastname character varying(64) NOT NULL
);


ALTER TABLE public.users OWNER TO sqladmin;

--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- Name: category_types category_types_pk; Type: CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.category_types
    ADD CONSTRAINT category_types_pk PRIMARY KEY (id);


--
-- Name: transactions transactions_pk; Type: CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: categories_category_type_id_name_user_id_uindex; Type: INDEX; Schema: public; Owner: sqladmin
--

CREATE UNIQUE INDEX categories_category_type_id_name_user_id_uindex ON public.categories USING btree (category_type_id, name, user_id);


--
-- Name: category_types_id_kind_uindex; Type: INDEX; Schema: public; Owner: sqladmin
--

CREATE UNIQUE INDEX category_types_id_kind_uindex ON public.category_types USING btree (id, kind);


--
-- Name: transactions_category_id_amount_index; Type: INDEX; Schema: public; Owner: sqladmin
--

CREATE INDEX transactions_category_id_amount_index ON public.transactions USING btree (category_id, amount);


--
-- Name: transactions_user_id_amount_index; Type: INDEX; Schema: public; Owner: sqladmin
--

CREATE INDEX transactions_user_id_amount_index ON public.transactions USING btree (user_id, amount) NULLS NOT DISTINCT;


--
-- Name: transactions_user_id_category_id_amount_index; Type: INDEX; Schema: public; Owner: sqladmin
--

CREATE INDEX transactions_user_id_category_id_amount_index ON public.transactions USING btree (user_id, category_id, amount);


--
-- Name: users_email_uindex; Type: INDEX; Schema: public; Owner: sqladmin
--

CREATE UNIQUE INDEX users_email_uindex ON public.users USING btree (email);


--
-- Name: categories update_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: sqladmin
--

CREATE TRIGGER update_timestamp_trigger BEFORE INSERT OR UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();


--
-- Name: category_types update_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: sqladmin
--

CREATE TRIGGER update_timestamp_trigger BEFORE INSERT OR UPDATE ON public.category_types FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();


--
-- Name: transactions update_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: sqladmin
--

CREATE TRIGGER update_timestamp_trigger BEFORE INSERT OR UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();


--
-- Name: users update_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: sqladmin
--

CREATE TRIGGER update_timestamp_trigger BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();


--
-- Name: categories categories_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_categories_id_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id);


--
-- Name: categories categories_category_types_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_category_types_id_fk FOREIGN KEY (category_type_id) REFERENCES public.category_types(id);


--
-- Name: categories categories_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: transactions transactions_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: transactions transactions_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: sqladmin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict m4qfeWn7FdSDJk7IKPKGG36GxgbYBaxnBSIbiUeayvP0KKQnSnHu1f4whzHZAkQ

