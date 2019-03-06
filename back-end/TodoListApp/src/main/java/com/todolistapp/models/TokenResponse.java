package com.todolistapp.models;

public class TokenResponse {
	
	private String token;
	
	private MemberDTO member;
	
	public TokenResponse(MemberDTO member, String token){
		this.token = token;
		this.member = member;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public MemberDTO getMember() {
		return member;
	}

	public void setMember(MemberDTO member) {
		this.member = member;
	}
}
