package com.ufc.ufc_elo.Fighter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FighterService {

    private final FighterRepository fighterRepository;

    @Autowired
    public FighterService(FighterRepository fighterRepository) {
        this.fighterRepository = fighterRepository;
    }

    public List<Fighter> getAllFighters() {
        return fighterRepository.findAll();
    }

    public List<String> getAllFighterNames() {
        return fighterRepository.findAll()
                .stream()
                .map(Fighter::getName)
                .toList();
    }

    public Fighter findFighterByNameIgnoreCase(String name) {
        return fighterRepository.findFighterByNameIgnoreCase(name);
    }

    public Page<Fighter> findAll(Pageable pageable) {
        return fighterRepository.findAll(pageable);
    }
}
