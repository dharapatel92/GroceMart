package com.groceMart.entity;

import com.groceMart.dto.common.Role;
import com.groceMart.utils.RoleSetAttributeConverter;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Calendar;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends AuditEntityAt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String contact;
    private String forgotCode;
    private String expiry;
    private boolean isActive;
    private boolean isDelete;
    @JdbcTypeCode(SqlTypes.JSON)
    @Convert(converter = RoleSetAttributeConverter.class)
    private Set<Role> roles;

    // Constructor
    public User(int Long, String email, String password, String firstName, String lastName, String contact, boolean isActive,
                boolean isDelete, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contact = contact;
        this.isActive = isActive;
        this.isDelete = isDelete;
        this.roles = roles;
    }

    public User() {

    }

    // Getters and setters
    // You can generate these automatically in most IDEs like IntelliJ IDEA or Eclipse

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    
    public String getForgotCode() {
		return forgotCode;
	}

	public void setForgotCode(String forgotCode) {
		this.forgotCode = forgotCode;
	}

	public String getExpiry() {
		return expiry;
	}

	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}

	// toString method for easy printing
	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", contact=" + contact + ", forgotCode=" + forgotCode + ", expiry="
				+ expiry + ", isActive=" + isActive + ", isDelete=" + isDelete + ", roles=" + roles + "]";
	}


   
}
