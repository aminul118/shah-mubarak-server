import { Router } from "express";
import { SubscriptionController } from "./subscription.controller";

const router = Router();

router.post("/create", SubscriptionController.createSubscription);

export const SubscriptionRoute = router;
