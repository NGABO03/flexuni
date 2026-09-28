insert into public.countries(name,code) values
('Rwanda','RW'),('Kenya','KE'),('Uganda','UG'),('Tanzania','TZ'),('Nigeria','NG'),('Ghana','GH'),
('South Africa','ZA'),('United Kingdom','GB'),('United States','US'),('Canada','CA'),('India','IN'),('Australia','AU')
on conflict(code) do nothing;

insert into public.universities(country_id,name,city,website,verified)
select c.id,v.name,v.city,v.website,true from public.countries c join (values
('RW','University of Rwanda','Kigali','https://ur.ac.rw'),
('KE','University of Nairobi','Nairobi','https://uonbi.ac.ke'),
('UG','Makerere University','Kampala','https://mak.ac.ug'),
('TZ','University of Dar es Salaam','Dar es Salaam','https://udsm.ac.tz'),
('NG','University of Lagos','Lagos','https://unilag.edu.ng'),
('GH','University of Ghana','Accra','https://ug.edu.gh'),
('ZA','University of Cape Town','Cape Town','https://uct.ac.za'),
('GB','University of Oxford','Oxford','https://ox.ac.uk'),
('US','University of California, Berkeley','Berkeley','https://berkeley.edu'),
('CA','University of Toronto','Toronto','https://utoronto.ca'),
('IN','Indian Institute of Technology Delhi','New Delhi','https://iitd.ac.in'),
('AU','University of Melbourne','Melbourne','https://unimelb.edu.au')
) as v(code,name,city,website) on c.code=v.code
where not exists(select 1 from public.universities u where u.name=v.name);
