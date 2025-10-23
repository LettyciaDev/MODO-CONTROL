package com.example.modocontrol.backend_service.model.user;

public enum UserRole {
    ADMIN("admin"),
    User("user");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }
}
