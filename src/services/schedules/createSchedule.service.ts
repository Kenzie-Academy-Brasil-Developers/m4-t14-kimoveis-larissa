import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { ISchedule } from "../../interfaces/schedules.interfaces";

const createScheduleService = async (
  scheduleData: ISchedule,
  userId: number
): Promise<void> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const scheduleDateHour = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .andWhere("schedule.date = :date", { date: scheduleData.date })
    .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
    .getOne();

  if (scheduleDateHour) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (scheduleData.hour > "18:00" || scheduleData.hour < "08:00") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM");
  }

  const newDate = new Date(scheduleData.date);

  const weekDay = newDate.getDay();

  if (weekDay === 0 || weekDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const realEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });
  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const foundedSchedule = await scheduleRepository.findOneBy({
    date: scheduleData.date,
    hour: scheduleData.hour,
  });

  if (foundedSchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const user: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const schedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: realEstate,
    user: user!,
  });

  await scheduleRepository.save(schedule);
};

export { createScheduleService };
