/*  문의  */
insert into inquiry(
mno,
type,
title,
contents,
attach_file,
answer
) values(
1,
1,
'문의글 올립니다.',
'궁금합니다.',
'askheufhiasehihaskuehfkuashefukshkushefk12412',
'대답입니다.'
);

insert into inquiry(
mno,
type,
title,
contents,
attach_file,
answer
) values(
2,
1,
'문의글을 다시 올립니다.',
'궁금합니다!!!.',
'askheufhiasehihasasefasef11kuehfkuashefukshkushefk12412',
'대답입니다. 대답입니다.'
);

insert into inquiry(
mno,
type,
title,
contents,
attach_file,
answer
) values(
3,
2,
'문의글 문의글 문의글',
'궁금합니다!!!????????',
'askheufhiasehihasasefasef11kuehfkuashefukshkushefk12412',
'대답입니다. 대답입니다. 대답입니다.'
);

insert into inquiry(
mno,
type,
title,
contents,
attach_file,
answer
) values(
4,
2,
'문의글 문의글 문의글',
'궁금합니다!!!????????',
'askheufhiasehihasasefasef11kuehfkuashefukshkushefk12412',
'대답입니다. 대답입니다. 대답입니다.'
);

insert into inquiry(
mno,
type,
title,
contents,
attach_file,
answer
) values(
5,
2,
'문의글 문의글 문의글',
'궁금합니다!!!????????',
'askheufhiasehihasasefasef11kuehfkuashefukshkushefk12412',
'대답입니다. 대답입니다. 대답입니다.'
);

insert into inquiry(
mno,
type,
title,
contents,
attach_file,
answer
) values(
1,
2,
'이용방법 설명 부탁드립니다.',
'이용방법이 궁금해요 알려주세요.',
'askheufhiasehihasasefaseserfseff11kuehfkuashefukshkushefk12412',
'이용방법이 어렵지 않습니다. 한번 이용해보세요'
);

insert into inquiry(
mno,
type,
title,
contents,
attach_file
) values(
1,
2,
'문의글 문의글 문의글 문의글',
'궁금합니다!!!????????@@@@',
'askheufhiasehihasasefasef11kuehfkuashefukshkushefk12412'
);

/* 커뮤니티 */
insert into community(
community_no,
title
) values(
1,
'우리지금만나'
);

insert into community(
community_no,
title
) values(
2,
'술집추천'
);

insert into community(
community_no,
title
) values(
3,
'분실실종센터'
);

insert into community(
community_no,
title
) values(
4,
'일상'
);

insert into community(
community_no,
title
) values(
5,
'사건사고'
);

insert into community(
community_no,
title
) values(
6,
'술게임'
);

insert into community(
community_no,
title
) values(
7,
'기타'
);

/* 모임 */
insert into party(
mno,
store_no,
title,
contents,
party_fee,
meeting_date,
max_member,
alcohol_type,
alcohol_limit,
view_count
) values(
1,
1,
'외롭다...ㅠㅠ같이 술 드실분?',
'오늘밤 11시에 신논현 역에서...',
20000,
'2022-02-21',
6,
'소주',
5,
3
);

insert into party(
mno,
store_no,
title,
contents,
party_fee,
meeting_date,
max_member,
alcohol_type,
alcohol_limit,
view_count
) values(
3,
2,
'친목모임하실분',
'친목모임하실분',
20000,
'2022-03-22',
6,
'맥주',
11,
4
);

insert into party(
mno,
store_no,
title,
contents,
party_fee,
meeting_date,
max_member,
alcohol_type,
alcohol_limit,
view_count
) values(
4,
3,
'친목',
'와인마실분',
20000,
'2022-03-22',
6,
'와인',
11,
68
);

insert into party(
mno,
store_no,
title,
contents,
party_fee,
meeting_date,
max_member,
alcohol_type,
alcohol_limit,
view_count
) values(
5,
4,
'산할아버지',
'구름모자썼네',
30000,
'2022-03-22',
6,
'막걸리',
11,
45
);

insert into party(
mno,
store_no,
title,
contents,
party_fee,
meeting_date,
max_member,
alcohol_type,
alcohol_limit,
view_count
) values(
2,
5,
'안주는 껍데기',
'껍데기랑 소주먹을분',
30000,
'2022-03-23',
6,
'소주',
11,
34
);

/* 댓글 좋아요 */
insert into comment_like(
mno,
board_comment_no
) values(
1,
1
);

insert into comment_like(
mno,
board_comment_no
) values(
5,
5
);

insert into comment_like(
mno,
board_comment_no
) values(
3,
4
);

insert into comment_like(
mno,
board_comment_no
) values(
4,
1
);

insert into comment_like(
mno,
board_comment_no
) values(
5,
2
);

/* 모임 주점 평가
 * 참석자와 모임이 있어야 평가를 할 수 있다
 * 참석자는 회원정보가 있어야한다.
 * */
insert into party_store_evaluation(
party_no,
mno,
score
) values(
1,
1,
1.5
);

insert into party_store_evaluation(
party_no,
mno,
score
) values(
1,
2,
2.5
);

insert into party_store_evaluation(
party_no,
mno,
score
) values(
1,
3,
2.5
);

insert into party_store_evaluation(
party_no,
mno,
score
) values(
1,
4,
2.5
);

insert into party_store_evaluation(
party_no,
mno,
score
) values(
1,
5,
5
);

<<<<<<< HEAD
/* 참석자 임시
=======
/* 모임 댓글 좋아요 */
insert into party_comment_like(
party_comment_no,
mno
) values(
1,
1
);

insert into party_comment_like(
party_comment_no,
mno
) values(
2,
2
);

insert into party_comment_like(
party_comment_no,
mno
) values(
3,
3
);

insert into party_comment_like(
party_comment_no,
mno
) values(
4,
4
);

insert into party_comment_like(
party_comment_no,
mno
) values(
5,
5
);


/* 참석자 임시
>>>>>>> 2bfa8bc0143a86e205dccd0e14bb02abef1700ed
insert into party_participant(
party_no,
mno,
participant_status
) values(
1,
1,
'참'
);

insert into party_participant(
party_no,
mno,
participant_status
) values(
1,
4,
'참'
);
*/
