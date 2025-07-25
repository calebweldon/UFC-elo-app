package com.ufc.ufc_elo.Fight;

import com.ufc.ufc_elo.FightDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FightController {

	private final FightService fightService;

	@Autowired
	public FightController(FightService fightService) {
		this.fightService = fightService;
	}

	@GetMapping("api/fights/{name}")
	public List<FightDetailsDTO> findFightsByFighterNameIgnoreCase(@PathVariable String name) {
		return fightService.findFightsByFighterNameIgnoreCase(name);
	}
}
