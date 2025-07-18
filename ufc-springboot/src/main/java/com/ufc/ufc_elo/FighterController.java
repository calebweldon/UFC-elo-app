package com.ufc.ufc_elo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FighterController {

    private final FighterService fighterService;

    @Autowired
    public FighterController(FighterService fighterService) {
        this.fighterService = fighterService;
    }

    @GetMapping("api/fighters")
    public List<Fighter> getAllFighters() {
        return fighterService.getAllFighters();
    }

    @GetMapping("api/fighters/{id}")
    public Fighter findFighterById(@PathVariable Integer id) {
        return fighterService.findFighterById(id);
    }
}
