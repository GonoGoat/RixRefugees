--Endroits équipé/disponibles--
insert into equipments (name) values ('test'),('test2'),('test3');
insert into places (name,address,description) values ('here','there',''),('overthere','just there','descr'),('far away','really far','like REALLY');
insert into accomodations (places_id,equipments_id) values (1,1),(2,1),(2,2),(3,1),(3,2),(3,3);
insert into Places_availabilities (start_avail,end_avail,bed_quantity,places_id)
    values ('2016-06-22 19:10:25 ','2016-06-22 19:20:25',5,1),('2016-08-22 19:10:25 ','2016-08-22 19:20:25 ',3,2),('2019-08-22 19:10:25 ','2019-08-22 19:20:25 ',9,3);