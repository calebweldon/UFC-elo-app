package com.ufc.ufc_elo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FightService {

	private final FightRepository fightRepository;

	@Autowired
	public FightService(FightRepository fightRepository) {
		this.fightRepository = fightRepository;
	}

	public List<FightDetailsDTO> findFightsByFighterNameIgnoreCase(String name) {
		return fightRepository.findFightsByFighterNameIgnoreCase(name.trim());
	}
}
