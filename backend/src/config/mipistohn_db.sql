create database mipistohn_db;
use mipistohn_db;

create table Usuario(
	id_usuario int primary key auto_increment,
    primer_nombre varchar(100) not null,
    segundo_nombre varchar(100),
    primer_apellido varchar(100) not null,
    segundo_apellido varchar(100),
    correo_electronico varchar(200) not null unique,
    contrasena varchar(255) not null,
    imagen_perfil varchar(255)
);

create table Presupuesto(
	id_presupuesto int primary key auto_increment,
    id_usuario int not null,
    monto decimal(10, 2) not null,
    nombre_presupuesto varchar(100) not null,
    fecha_registro datetime default now() not null,
    notas varchar(200),
    foreign key(id_usuario) references Usuario(id_usuario) on delete cascade
);

create table Categoria(
	codigo_categoria int primary key auto_increment,
    categoria varchar(100) not null
);

create table Gasto(
	id_gasto int primary key auto_increment,
    id_presupuesto int not null,
    id_usuario int not null,
    nombre_gasto varchar(100) not null,
    codigo_categoria int not null,
    monto decimal(10,2) not null,
    notas varchar(200),
    fecha_registro datetime default now() not null,
    foreign key(id_usuario) references Usuario(id_usuario) on delete cascade,
    foreign key(id_presupuesto) references Presupuesto(id_presupuesto) on delete cascade,
    foreign key(codigo_categoria) references Categoria(codigo_categoria)
);

INSERT INTO Categoria (categoria) VALUES
('Alimentación'),
('Transporte'),
('Vivienda'),
('Servicios'),
('Educación'),
('Salud'),
('Entretenimiento'),
('Ropa y calzado'),
('Ahorro e inversión'),
('Deudas / préstamos'),
('Mascotas'),
('Tecnología'),
('Viajes'),
('Regalos'),
('Otros');

