package com.ufc.ufc_elo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/api/fighters/names")
    public List<String> getAllFighterNames() {
        return fighterService.getAllFighterNames();
    }

    @GetMapping("api/fighter/{name}")
    public Fighter findFighterByNameIgnoreCase(@PathVariable String name) {
        return fighterService.findFighterByNameIgnoreCase(name.trim());
    }

    @GetMapping("api/fighters/page")
    public Page<Fighter> getFightersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "currentElo") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy));
        return fighterService.findAll(pageable);
    }
}
