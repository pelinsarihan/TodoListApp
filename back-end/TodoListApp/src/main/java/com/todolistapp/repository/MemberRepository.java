package com.todolistapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todolistapp.models.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Member findByUsername(String username);
	Member findByEmail(String email);
}