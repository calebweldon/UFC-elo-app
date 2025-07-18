package com.ufc.ufc_elo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FightController {

	private final FightService fightService;

	@Autowired
	public FightController(FightService fightService) {
		this.fightService = fightService;
	}
}
