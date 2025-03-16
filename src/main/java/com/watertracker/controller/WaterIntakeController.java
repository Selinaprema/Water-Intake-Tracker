@RestController
@RequestMapping("/api/water")
public class WaterIntakeController {
    private final WaterIntakeService service;

    public WaterIntakeController(WaterIntakeService service) {
        this.service = service;
    }

    @GetMapping
    public List<WaterIntake> getWaterIntakes() {
        return service.getAllIntakes();
    }

    @PostMapping
    public WaterIntake addWaterIntake(@RequestBody WaterIntake intake) {
        return service.saveIntake(intake);
    }
}
