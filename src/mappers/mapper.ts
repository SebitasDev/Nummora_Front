import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import {financeLoanProfile} from "@/mappers/loan.mapper";

export const mapper = createMapper({
    strategyInitializer: classes(),
});

financeLoanProfile(mapper);