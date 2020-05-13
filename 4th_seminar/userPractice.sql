USE Sopt;

SELECT * FROM user;

/-- user 데이터의 개수 --/
SELECT COUNT(*) FROM user;

/-- 둘의 차이를 비교해보세요~ --/
SELECT name FROM user ORDER BY name;
SELECT name FROM user ORDER BY name DESC;
SELECT name, email FROM user WHERE userIdx='5';

/-- INSERT 의 두 가지 방법 비교해보기 --/
INSERT INTO user (name, password, email, phone) VALUES ('Anne', 'sA75idsd34E', 'Anne@sopt.org', '010-738-8304');
/-- 필수 데이터를 다 넣어주었을 때에만 가능 --/
INSERT INTO user VALUES ('Conan', 'h43Dgbg68fDF23', 'Conan@sopt.org', '010-766-2514');

/-- 특정 Idx를 찾고 해서 사용자의 이름 바꾸기 --/
UPDATE user SET name='gngsn' WHERE userIdx='3';
SELECT * FROM user WHERE userIdx='3';

/-- 특정 Idx를 찾아서 사용자를 지우기 --/
DELETE FROM user WHERE userIdx='3';
SELECT * FROM user WHERE userIdx='3';