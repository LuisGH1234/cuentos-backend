CREATE USER 'iam-user-backend03' IDENTIFIED WITH AWSAuthenticationPlugin as 'RDS';
GRANT ALL privileges ON `storydb`.* TO 'iam-user-backend03'@'%';
FLUSH PRIVILEGES;

select * from mysql.user;

show grants for 'iam-user-backend03';

-- para que funcione debe hacerse todo IGUAL