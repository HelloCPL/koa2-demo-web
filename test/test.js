/*
  文件存储表
  CREATE TABLE tb_files (
    id INT UNSIGNED PRIMARY KEY AOTU_INCREMENT,
    create_time BIGINT NOT NULL,
    file_path VARCHAR(255) NOT NULL UNIQUE, // 短路径
    place VARCHAR(20) NOT NULL DEFAULT images, // 文件存放目录位置 images files ueimages
    file_name VARCHAR(255),
    file_size INT,
    type VARCHAR(255),
    remark VARCHAR(255)
  );

*/

let test              =              '测试'

let sa =              'sdfs'
let s='sd'

let abj = 'abj'
