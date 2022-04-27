package com.bitproject.service;

import java.util.List;
import com.bitproject.domain.Member;

public interface AdminMemberService {

  List<Member> list(int pageSize, int pageNo);

  int size();

  int typeSize(boolean memberStatus);

  List<Member> get(String filt, String value);

  //  int add(Member member);
  //
  //  Member getMemberByEmailAndPassword(String email, String password);
  //
  //  Member getMemberByEmail(String email);
  //
  //
  int update(int no);

}