package com.example.modocontrol.backend_service.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.modocontrol.backend_service.model.user.User;

public interface UserRepository extends JpaRepository<User, String>{

    UserDetails findByLogin(String id);

}
