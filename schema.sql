-- Guide Écolo Thaïlande — Neon schema

create table if not exists suggestions (
  id serial primary key,
  created_at timestamptz default now(),
  type text default 'lieu',
  name text not null,
  cat text,
  addr text,
  city text,
  descr text,
  cost text,
  link text,
  firstname text,
  email text,
  status text default 'pending'
);

create table if not exists entries (
  id serial primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  cat text not null,
  city text[],
  addr text,
  lat float8 default 13.75,
  lng float8 default 100.52,
  descr text,
  cost text,
  subtags text[],
  link text,
  published boolean default true,
  source text default 'manual'
);

create table if not exists events (
  id serial primary key,
  created_at timestamptz default now(),
  title text not null,
  date_str text,
  day_str text,
  month_str text,
  lieu text,
  type_str text,
  descr text,
  full_descr text,
  published boolean default true
);

create table if not exists who_content (
  id text primary key,
  content text,
  updated_at timestamptz default now()
);

insert into who_content (id, content) values
('demarche', 'Ce guide écolo est né d''un constat simple : les Français de Thaïlande manquent d''un outil pratique pour trouver les initiatives durables près de chez eux. Il est à la fois une ressource collective et un acte politique, parce que l''écologie ne se fait pas seulement dans les urnes, mais au quotidien.'),
('liste', 'Notre liste est soutenue par les sénatrices Mélanie Vogel et Mathilde Ollivier, et affiliée aux Écologistes - Europe Écologie Les Verts.'),
('contact', 'Vous voulez ajouter une adresse ou signaler une erreur ? Utilisez l''onglet Contribuer.')
on conflict (id) do nothing;
