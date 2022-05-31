package com.example.demo.database;

import javax.persistence.Embeddable;

@Embeddable
public class Address {
    public String country, code;

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "Address{" +
                "country='" + country + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}
