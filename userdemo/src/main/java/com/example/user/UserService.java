package com.example.user;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {
	private UserRepository userRepository;
	public UserService(UserRepository userRepository) {
		this.userRepository=userRepository;
		
	}
	public void save(User user) {
		userRepository.save(user);
	}
	public Optional<User> find(int id) {
		return userRepository.findById(id);
	}
	public java.util.List<User> findAll(){
		return userRepository.findAll();
	}
	
	
	

}
