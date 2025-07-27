import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import AuthRouter from "../modules/auth/auth.route";
import { ScheduleRouter } from "../modules/schedule/schedule.routes";

interface IModuleRoutes {
  path: string;
  route: Router;
}

const router = Router();

const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/schedule",
    route: ScheduleRouter,
  },
];

moduleRoutes.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;
