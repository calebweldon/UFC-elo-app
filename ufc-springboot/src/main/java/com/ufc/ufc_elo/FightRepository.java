package com.ufc.ufc_elo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FightRepository extends JpaRepository<Fight, Integer> {

	@Query("""
		SELECT new com.ufc.ufc_elo.FightDetailsDTO(
			f.opponent.name,
			f.event.event,
			f.event.location,
			f.event.date,
			f.result,
			f.fighterPreElo,
			f.fighterPostElo,
			f.opponentElo,
			f.weightClass,
			f.method,
			f.round,
			f.time
		)
		FROM Fight f
		WHERE f.fighter.id = (
			SELECT fi.id FROM Fighter fi WHERE LOWER(fi.name) = LOWER(:name)
		)
	""")
	List<FightDetailsDTO> findFightsByFighterName(@Param("name") String name);

}
