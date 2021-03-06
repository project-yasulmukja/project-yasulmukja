package com.bitproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bitproject.dao.CommunityDao;
import com.bitproject.domain.CommunityMain;

@RestController
public class CommunityController {

  @Autowired
  CommunityDao communityDao;

  @RequestMapping("/community/list")
  public Object list() {
    return communityDao.findAll();
  }

  @RequestMapping("/community/add")
  public Object add(CommunityMain communityMain) {
    return communityDao.insert(communityMain);
  }


  @RequestMapping("/community/get")
  public Object get(int no) {
    CommunityMain communityMain = communityDao.findByNo(no);
    //    return 1;
    if (communityMain == null) {
      return "";
    }
    communityDao.increaseViewCount(no);
    return communityMain;
  }

  @RequestMapping("community/update")
  public Object update(CommunityMain communityMain){
    return communityDao.update(communityMain);
  }

  @RequestMapping("community/delete")
  public Object delete(int no) {
    return communityDao.delete(no);
  }
}
