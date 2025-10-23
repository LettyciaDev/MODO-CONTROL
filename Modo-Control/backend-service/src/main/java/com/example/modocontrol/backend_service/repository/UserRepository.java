package com.example.modocontrol.backend_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.modocontrol.backend_service.model.user.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
