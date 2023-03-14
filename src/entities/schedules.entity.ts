import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./users.entity";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time", nullable: true })
  hour: string;

  @ManyToOne(() => User, (user) => user.schedule)
  user: User;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.schedule)
  realEstate: RealEstate;
}

export { Schedule };
