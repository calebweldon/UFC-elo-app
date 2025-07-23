package com.ufc.ufc_elo.Fighter;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="fighters")
@NoArgsConstructor
@AllArgsConstructor
public class Fighter {

    @Id
    @Column(name="fighter_id")
    private Integer id;

    private String name;

    @Column(name="current_elo")
    private Float currentElo;

    @Column(name="peak_elo")
    private Float peakElo;

    private Integer wins;

    private Integer losses;

    private Integer draws;

    private Integer ncs;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Float getCurrentElo() {
        return currentElo;
    }

    public Float getPeakElo() {
        return peakElo;
    }

    public Integer getWins() {
        return wins;
    }

    public Integer getLosses() {
        return losses;
    }

    public Integer getDraws() {
        return draws;
    }

    public Integer getNcs() {
        return ncs;
    }
}
