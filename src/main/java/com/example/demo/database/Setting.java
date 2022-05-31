package com.example.demo.database;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;

@Entity
public class Setting implements Serializable {
    @Id
    @OneToOne
    public User User;
    public boolean dataHarvest, darkMode;

    public User getUser() {
        return User;
    }

    public void setUser(User pk_User) {
        this.User = pk_User;
    }

    public boolean isDataHarvest() {
        return dataHarvest;
    }

    public void setDataHarvest(boolean dataHarvest) {
        this.dataHarvest = dataHarvest;
    }

    public boolean isDarkMode() {
        return darkMode;
    }

    public void setDarkMode(boolean darkMode) {
        this.darkMode = darkMode;
    }

    @Override
    public String toString() {
        return "Setting{" +
                "User=" + User +
                ", dataHarvest=" + dataHarvest +
                ", darkMode=" + darkMode +
                '}';
    }
}
