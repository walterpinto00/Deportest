-- ============================================================================
-- SCRIPT DE BASE DE DATOS - DEPORTEST (REESCRITURA MEJORADA)
-- REGLAS DE INTEGRIDAD, DUPLICIDAD, SINTAXIS, RELACIONES Y NORMALIZACIÓN
-- COMPATIBLE CON MYSQL / POSTGRESQL
-- ============================================================================

-- Eliminar tablas en orden inverso
DROP TABLE IF EXISTS planes_nutricion CASCADE;
DROP TABLE IF EXISTS test_resultados CASCADE;
DROP TABLE IF EXISTS test_baremo CASCADE;
DROP TABLE IF EXISTS pruebas CASCADE;
DROP TABLE IF EXISTS analisis_clinico CASCADE;
DROP TABLE IF EXISTS pliegues CASCADE;
DROP TABLE IF EXISTS perimetros CASCADE;
DROP TABLE IF EXISTS datos_fisicos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- 1. TABLA USUARIO Y ROLES
CREATE TABLE usuarios (
    id_usuario VARCHAR(15) PRIMARY KEY,
    tipo_identificacion VARCHAR(50) NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    genero VARCHAR(20),
    fecha_nacimiento DATE,
    centro_formacion VARCHAR(100),
    programa_formacion VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    grupo VARCHAR(15),
    telefono VARCHAR(20),
    rol VARCHAR(20) NOT NULL CONSTRAINT chk_rol CHECK (rol IN ('ADMINISTRADOR', 'INSTRUCTOR', 'BIENESTAR', 'APRENDIZ'))
);

-- 2. TABLA DATOS FISICOS
CREATE TABLE datos_fisicos (
    id_datos INT AUTO_INCREMENT PRIMARY KEY, -- Para PostgreSQL cambiar a SERIAL
    id_usuario VARCHAR(15) NOT NULL,
    fecha_registro DATE NOT NULL,
    evaluador VARCHAR(80),
    edad INT NOT NULL,
    talla DECIMAL(4,2),
    peso DECIMAL(5,2),
    CONSTRAINT fk_datos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. TABLA PERÍMETROS (MEDIDAS EN CM)
CREATE TABLE perimetros (
    id_perimetro INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario VARCHAR(15) NOT NULL,
    fecha_registro DATE NOT NULL,
    p_hombro DECIMAL(5,2),
    p_torax DECIMAL(5,2),
    p_brazo_der DECIMAL(5,2),
    p_brazo_izq DECIMAL(5,2),
    p_cintura DECIMAL(5,2),
    p_cadera DECIMAL(5,2),
    p_muslo_sup DECIMAL(5,2),
    p_muslo_medio DECIMAL(5,2),
    p_muslo_inf DECIMAL(5,2),
    p_pierna DECIMAL(5,2),
    CONSTRAINT fk_perimetros_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. TABLA PLIEGUES (MEDIDAS EN MM)
CREATE TABLE pliegues (
    id_pliegue INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario VARCHAR(15) NOT NULL,
    fecha_registro DATE NOT NULL,
    pl_bicipital DECIMAL(5,2),
    pl_tricipital DECIMAL(5,2),
    pl_subescapular DECIMAL(5,2),
    pl_suprailiaco DECIMAL(5,2),
    pl_abdominal DECIMAL(5,2),
    pl_muslo DECIMAL(5,2),
    pl_pantorrilla DECIMAL(5,2),
    CONSTRAINT fk_pliegues_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. TABLA ANÁLISIS CLÍNICO Y POSTURAL (INCLUYE SOMATOTIPO/TIPO CUERPO)
CREATE TABLE analisis_clinico (
    id_analisis INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario VARCHAR(15) NOT NULL,
    fecha_registro DATE NOT NULL,
    t_arterial VARCHAR(20),
    peso_ideal DECIMAL(5,2),
    indice_obesidad DECIMAL(5,2),
    somatotipo VARCHAR(50) CONSTRAINT chk_soma CHECK (somatotipo IN ('ECTOMORFO', 'MESOMORFO', 'ENDOMORFO')),
    escoliosis VARCHAR(50),
    cifosis VARCHAR(50),
    lordosis VARCHAR(50),
    CONSTRAINT fk_analisis_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 6. TABLA TESTS FÍSICOS
CREATE TABLE pruebas (
    id_test INT AUTO_INCREMENT PRIMARY KEY,
    nombre_test VARCHAR(100) NOT NULL,
    unidad_medida VARCHAR(20)
);

-- 7. TABLA TEST BAREMO (Guía de Puntos)
CREATE TABLE test_baremo (
    id_baremo INT AUTO_INCREMENT PRIMARY KEY,
    id_test INT NOT NULL,
    genero CHAR(1) NOT NULL CONSTRAINT chk_gen CHECK (genero IN ('M', 'F')),
    marca_minima DECIMAL(10,2),
    marca_maxima DECIMAL(10,2),
    puntos INT,
    CONSTRAINT fk_baremo_test FOREIGN KEY (id_test) REFERENCES pruebas(id_test) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 8. TABLA RESULTADOS DE TEST DE USUARIOS
CREATE TABLE test_resultados (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario VARCHAR(15) NOT NULL,
    id_test INT NOT NULL,
    fecha_registro DATE NOT NULL,
    marca DECIMAL(10,2) NOT NULL,
    puntos_obtenidos INT,
    valoracion VARCHAR(50),
    CONSTRAINT fk_result_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_result_test FOREIGN KEY (id_test) REFERENCES pruebas(id_test) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 9. TABLA PLANES DE NUTRICION (ASISTIDOS POR IA)
CREATE TABLE planes_nutricion (
    id_plan INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario VARCHAR(15) NOT NULL,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    objetivo_calorico VARCHAR(100),
    dieta_recomendada TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'VIGENTE' CONSTRAINT chk_estado_plan CHECK (estado IN ('VIGENTE', 'FINALIZADO')),
    CONSTRAINT fk_planes_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- DATOS DE PRUEBA
INSERT INTO usuarios (id_usuario, tipo_identificacion, nombre, apellidos, genero, fecha_nacimiento, centro_formacion, programa_formacion, correo, password_hash, rol) VALUES 
('1001234567', 'CC', 'Juan', 'Perez', 'M', '2005-03-15', 'CENIGRAF', 'ADSO', 'juan@sena.edu.co', 'hash123', 'APRENDIZ'),
('1009876543', 'CC', 'Maria', 'Gomez', 'F', '2004-07-22', 'CENIGRAF', 'Multimedia', 'maria@sena.edu.co', 'hash456', 'APRENDIZ'),
('12345678', 'CC', 'Admin', 'Sistema', 'M', '1990-01-01', 'CENIGRAF', 'N/A', 'admin@deportest.edu.co', 'hash789', 'ADMINISTRADOR');

INSERT INTO analisis_clinico (id_usuario, fecha_registro, peso_ideal, somatotipo) VALUES
('1001234567', '2023-10-25', 70.5, 'MESOMORFO'),
('1009876543', '2023-10-26', 60.0, 'ECTOMORFO');

INSERT INTO planes_nutricion (id_usuario, objetivo_calorico, dieta_recomendada) VALUES
('1001234567', 'Aumento masa', 'Dieta hipercalórica: pollo, arroz, brócoli, huevos.');
