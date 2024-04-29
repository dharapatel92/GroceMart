package com.groceMart.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "organization")
public class Organization extends AuditEntityAt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String organizationName;
    private String contact;
    private String address;
    private String city;
    private String state;
    private String code;
    private boolean isActive;


    // Constructors
    public Organization() {
        // Default constructor
    }

    public Organization(int id, String organizationName, String contact, String address, String city, String state,
                        String code, boolean isActive) {
        this.id = id;
        this.organizationName = organizationName;
        this.contact = contact;
        this.address = address;
        this.city = city;
        this.state = state;
        this.code = code;
        this.isActive = isActive;

    }

    // Getters and setters
    // You can generate these automatically in most IDEs like IntelliJ IDEA or Eclipse

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }


    // toString method for easy printing
    @Override
    public String toString() {
        return "Organization{" +
                "id=" + id +
                ", organizationName='" + organizationName + '\'' +
                ", contact='" + contact + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", code='" + code + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}
