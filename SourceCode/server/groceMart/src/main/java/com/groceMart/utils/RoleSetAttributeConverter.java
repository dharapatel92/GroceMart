package com.groceMart.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.groceMart.dto.common.Role;
import jakarta.persistence.AttributeConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.Set;

public class RoleSetAttributeConverter implements AttributeConverter<Set<Role>, String> {
    private final Logger log = LoggerFactory.getLogger(RoleSetAttributeConverter.class);
    ObjectMapper objectMapper;

    public RoleSetAttributeConverter() {
        objectMapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    }

    @Override
    public String convertToDatabaseColumn(Set<Role> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (final JsonProcessingException e) {
            log.error("JSON writing error", e);
        }
        return null;
    }

    @Override
    public Set<Role> convertToEntityAttribute(String json) {
        try {
            return objectMapper.readValue(json, new TypeReference<>() {
            });
        } catch (final IOException e) {
            log.error("JSON reading error", e);
        }
        return Collections.emptySet();
    }
}