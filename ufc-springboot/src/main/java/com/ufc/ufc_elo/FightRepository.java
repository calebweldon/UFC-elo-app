package com.ufc.ufc_elo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FightRepository extends JpaRepository<Fighter, Integer> {

}
