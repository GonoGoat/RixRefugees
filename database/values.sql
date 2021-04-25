--Endroits équipé/disponibles--
insert into equipments (name) values ('WiFi'),('Lave-vaiselle'),('Cuisine');
insert into places (name,address,description) values ('Local scout','Rue du chemin 7 1300 Wavre','En travaux le 05/05'),('Maison communale','Avenue de l Equinoxe 4 1300 Wavre',''),('Base','Place communale, 1435 Mont-saint-Guibert','');
insert into accomodations (places_id,equipments_id) values (1,1),(2,1),(2,2),(3,1),(3,2),(3,3);
insert into places_availabilities (start_avail,end_avail,bed_quantity,places_id)
    values ('1977-04-22T01:00:00-05:00 ','1978-04-22T01:00:00-05:00',5,1),('2022-08-22 19:10:25 ','2022-08-22 19:20:25 ',3,2),('2025-08-22 19:10:25 ','2025-08-22 19:20:25 ',9,3);

--Sessions et utilisateurs--
insert into users (password,fname,lname,mail,isAdmin,isActive,lastActivity,contact)
    values ('test123','Marc','Deville','marc.deville54@outlook.fr',true,true,now(),''),('test123','Gauthier','Verschraegen','gauth.vrsgn@outlook.be',false,true,now(),''),
    ('test123','Claude','Masson','c.masson@ephec.be',true,true,now(),''),('test123','Lucas','Pastori','lucas.pastori@gmail.com',true,true,now(),'');
insert into sessions (start_date,end_date,users_id,places_availabilities_id) 
    values (now(),now(),1,1),('2050-06-12','2050-06-12',1,2),(now(),now(),3,3);

--Taches et taches de sessions--
insert into tasks (name) values ('Lessive'), ('Cours de boxe'), ('Atelier cuisine');
insert into sessions_tasks (isfromadmin,description,amountofpeople, start_date,end_date,tasks_id,sessions_id)
    values (true,'Lessive de la semaine pour les 5 occupants',1,now(),now(),1,1),(true,'Cours avec coach adrien à LLN',2,'2022-08-22 19:10:25','2022-08-22 19:30:25',2,2),
        (false,'Atelier à Mont-Saint-Guibert pour 2 amis',1,'2025-08-22 19:10:25','2025-08-22 19:20:25' ,3,3);

--Amis--
insert into status (name) values ('Demandeur'),('CGRA'),('Réfugié');
insert into friends (fname,status_id) values ('Paul',1),('Pierre',2),('Jacque',3),('Toto',1);

--Disponibilités et Assignations--
insert into availabilities (description,isCanceled,users_id,sessions_tasks_id)
    values ('dispo 1',false,1,1),('dispo 2',false,2,1),('dispo 3',false,3,1),
        ('dispo 1',false,1,2),('dispo 2',false,2,2),('dispo 1',false,3,3),('pas assigné',false,3,2);
insert into Assignments (friends_id,availabilities_id) values (1,1),(1,2),(2,2),(2,3),(3,4),(3,5);