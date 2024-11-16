INSERT INTO roles (nombre_rol) VALUES ('Prestamista');
INSERT INTO roles (nombre_rol) VALUES ('Prestatario');
INSERT INTO roles (nombre_rol) VALUES ('Admin');

INSERT INTO users(email, contrasena) VALUES ('Prestamista','$2a$12$G8uiA3gvoFYZATJsrOGGbeB9MnXE1qN3Tf7Duw0z/oYQ4FLPD8tMG');
INSERT INTO users(email, contrasena) VALUES ('Prestatario','$2a$12$YJHyr7E6RyT2SHg5QBgNquT9wSu13HfewKFAc21jMRJ.WXSLb9gKe');
INSERT INTO users(email, contrasena) VALUES ('Admin','$2a$12$E2ZPCtARUqAdPsdhL7hAFOOFPQY2jpdWu.8uWj/p7FCYsNtmqv5OG');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3);

--INSERT INTO tipo_producto (id, nombre) VALUES (1, 'Ropa')
--INSERT INTO tipo_producto (id, nombre) VALUES (2, 'Gasesosa')
--INSERT INTO tipo_producto (id, nombre) VALUES (3, 'Mueble')