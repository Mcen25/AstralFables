import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Users {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password?: string;

  @Column()
  provider?: string;

  @Column()
  providerId?: string;
}