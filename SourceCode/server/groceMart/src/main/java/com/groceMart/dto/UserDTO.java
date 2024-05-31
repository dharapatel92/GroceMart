package com.groceMart.dto;

import com.groceMart.dto.common.Role;
import com.groceMart.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String contact;
    private boolean isActive;
    private boolean isDelete;
    private Set<Role> roles;

    // Constructors
    public UserDTO() {
        // Default constructor
    }

    public UserDTO(Long id, String email, String firstName, String lastName, String contact, boolean isActive,
                   boolean isDelete,
                   Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contact = contact;
        this.isActive = isActive;
        this.isDelete = isDelete;
        this.roles = roles;
    }

    public static UserDTO build(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setContact(user.getContact());
        userDTO.setActive(user.isActive());
        userDTO.setDelete(user.isDelete());
        userDTO.setRoles(user.getRoles());
        return userDTO;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public static List<UserDTO> build(List<User> users) {
        if (users.isEmpty()) {
            return new ArrayList<>();
        } else {
            return users.stream().filter(Objects::nonNull)
                    .map(UserDTO::build).collect(Collectors.toList());
        }
    }
}
