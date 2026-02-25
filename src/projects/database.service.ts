 import { ProjectData } from "@/common/tasks.interface";
 import { Injectable, OnModuleInit } from "@nestjs/common";
 import { Low } from "lowdb/lib";
 import { JSONFile } from "lowdb/node";
 import projectJson from "../data/project.json";

 @Injectable()
 export class DatabaseService {
//      private projectsdb: ProjectData[] = projectJson as ProjectData[];

//    private db!: Low<projectsdb>;
//    async onModuleInit() {
//      const adapter = new JSONFile<DbSchema>(projectJson);
//      this.db = new Low(adapter, { projects: [] });
//      await this.db.read();
//    }

//    async getDb() {
//      await this.db.read();
//      return this.db;
//    }
 }
