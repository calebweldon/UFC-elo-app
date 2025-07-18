package com.ufc.ufc_elo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FighterRepository extends JpaRepository<Fighter, Integer> {

//    List<Fighter> findById();

    Fighter findFighterById(Integer id);
}
