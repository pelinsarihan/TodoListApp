package com.todolistapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.todolistapp.config.JWTAuthenticationFilter;
import com.todolistapp.models.Member;
import com.todolistapp.models.MemberDTO;
import com.todolistapp.models.TokenResponse;
import com.todolistapp.repository.MemberRepository;

@RestController
@RequestMapping("/todo")
public class AuthenticationController {

    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AuthenticationController(MemberRepository memberRepository,
                               BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.memberRepository = memberRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    @PostMapping(value = "/registration")
    public ResponseEntity<String> register(@RequestBody Member member) {
    	Member mem1 = memberRepository.findByUsername(member.getUsername());
    	Member mem2 = memberRepository.findByEmail(member.getEmail());
    	if (mem1 == null && mem2 == null) {
    		member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
            memberRepository.save(member);
            return new ResponseEntity<String>("OK", HttpStatus.OK);
		}else{
			return new ResponseEntity<String>("NOT_OK", HttpStatus.BAD_REQUEST);
		} 
    }
    
    @GetMapping(value = "/getToken/{username}")
    @ResponseBody
	public ResponseEntity<TokenResponse> getToken(@PathVariable String username){
    	Member member = memberRepository.findByUsername(username);
    	MemberDTO dto = new MemberDTO();
    	dto.setFirstName(member.getFirstName());
    	dto.setLastName(member.getLastName());
    	dto.setUsername(member.getUsername());
    	dto.setId(member.getId());
		return new ResponseEntity<TokenResponse>(new TokenResponse(dto, JWTAuthenticationFilter.tokenResp), HttpStatus.OK);
	}
    
}
