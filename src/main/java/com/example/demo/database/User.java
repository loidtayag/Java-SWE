package com.example.demo.database;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.List;

@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class User {
    @Id
    public int pkID;
    public String name, email, password;
    @Embedded
    public Address Address;

    public int getPkID() {
        return pkID;
    }
    @ManyToMany
    public List<Team> Teams;

    public void setPkID(int pk_ID) {
        this.pkID = pk_ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String userName) {
        this.name = userName;
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

    public com.example.demo.database.Address getAddress() {
        return Address;
    }


    public void setAddress(com.example.demo.database.Address address) {
        Address = address;
    }

    public List<Team> getTeams() {
        return Teams;
    }

    public void setTeams(List<Team> teams) {
        Teams = teams;
    }

    @Override
    public String toString() {
        return "User{" +
                "pkID=" + pkID +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", Address=" + Address +
                '}';
    }
}