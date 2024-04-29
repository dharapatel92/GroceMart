package com.groceMart.dto.common;

import jakarta.persistence.Embeddable;

@Embeddable
public enum Role {

    ADMIN,
    VENDOR,
    CUSTOMER

}
