package com.watertracker.service;

import com.watertracker.model.WaterIntake;
import com.watertracker.repository.WaterIntakeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WaterIntakeService {
    private final WaterIntakeRepository repository;

    public WaterIntakeService(WaterIntakeRepository repository) {
        this.repository = repository;
    }

    public List<WaterIntake> getAllIntakes() {
        return repository.findAll();
    }

    public WaterIntake saveIntake(WaterIntake intake) {
        return repository.save(intake);
    }
}
