--Endroits équipé/disponibles--
insert into equipments (name) values ('test'),('test2'),('test3');
insert into places (name,address,description) values ('here','there',''),('overthere','just there','descr'),('far away','really far','like REALLY');
insert into accomodations (places_id,equipments_id) values (1,1),(2,1),(2,2),(3,1),(3,2),(3,3);
insert into places_availabilities (start_avail,end_avail,bed_quantity,places_id)
    values ('1977-04-22T01:00:00-05:00 ','1978-04-22T01:00:00-05:00',5,1),('2022-08-22 19:10:25 ','2022-08-22 19:20:25 ',3,2),('2025-08-22 19:10:25 ','2025-08-22 19:20:25 ',9,3);

--Sessions et utilisateurs--
insert into users (password,fname,lname,mail,isAdmin,isActive,lastActivity,contact)
    values ('test123','jean','pierre','jean@pierre.com',true,true,now(),''),('test123','toto','toto','toto@toto.com',false,true,now(),''),
    ('test123','admin','admin','admin@admin.com',true,true,now(),'');
insert into sessions (start_date,end_date,users_id,places_availabilities_id) 
    values (now(),now(),1,1),('2050-06-12','2050-06-12',1,2),(now(),now(),3,3)

--Taches et taches de sessions--
insert into tasks (name) values ('tache1'), ('tache2'), ('tache3');
