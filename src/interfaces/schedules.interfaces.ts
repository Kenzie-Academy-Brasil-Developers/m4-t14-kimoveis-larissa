import { z } from "zod";
import {
  scheduleCreateSchema,
  scheduleResponseSchema,
} from "../schemas/schedules.schema";

type ISchedule = z.infer<typeof scheduleCreateSchema>;
type IScheduleResponse = z.infer<typeof scheduleResponseSchema>;

export { ISchedule, IScheduleResponse };
