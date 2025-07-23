package com.ufc.ufc_elo.Fighter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FighterRepository extends JpaRepository<Fighter, Integer> {

    Fighter findFighterByNameIgnoreCase(String name);
}
