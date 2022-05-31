package com.example.demo.database;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
public class Team {
    @Id
    public String pkName;
    @ManyToMany
    public List<User> Users;

    public String getPkName() {
        return pkName;
    }

    public void setPkName(String pk_Name) {
        this.pkName = pk_Name;
    }

    public List<User> getUsers() {
        return Users;
    }

    public void setUsers(List<User> users) {
        Users = users;
    }

    @Override
    public String toString() {
        return "Team{" +
                "pkName='" + pkName + '\'' +
                '}';
    }
}
