import { Request, Response } from "express";
import { ISchedule } from "../interfaces/schedules.interfaces";
import { createScheduleService } from "../services/schedules/createSchedule.service";
import { listSchedulesService } from "../services/schedules/listSchedules.service";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedulesData: ISchedule = req.body;
  const userId: number = req.user.id;

  await createScheduleService(schedulesData, userId);

  return res.status(201).json({
    message: "Schedule created",
  });
};

const listSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);

  const listSchedules = await listSchedulesService(realEstateId);

  return res.status(200).json(listSchedules);
};

export { createScheduleController, listSchedulesController };
