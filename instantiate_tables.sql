CREATE TABLE main ( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    submitted_url varchar(256) not null,
    url_code varchar(20) not null,
    UNIQUE (url_code)
);