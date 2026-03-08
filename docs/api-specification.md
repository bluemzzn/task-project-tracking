# API Specification

เอกสารระบุรายละเอียดทางเทคนิคของ REST API ทั้งหมดในระบบ Task-Project Tracking พัฒนาด้วย NestJS

## 1. Project Management Endpoints (`/projects`)

### 1.1 Get All Projects
- **Method:** `GET`
- **Description:** เรียกดูรายการโครงการทั้งหมด
- **Example Response (200 OK):**
```json
[
  {
    "type": "projects",
    "name": "Website Redesign",
    "id": 1,
    "title": "Corporate Website Redesign 2024",
    "status": "Planning",
    "taskIds": ["task_1708730000000_abcd123"],
    "statusDelete": "ACTIVE"
  }
]
```
### 1.2 Get Project by ID
- **Method:** `GET`
- **Path:** `/projects/:id`
- **Description:** เรียกดูข้อมูลโครงการรายตัว
- **Parameter:** `id` (Number - บังคับผ่าน `ParseIntPipe`)
- **Success Response (200 OK):** แสดง Object ของ Project ที่ตรงกับ ID นั้น

### 1.3 Create Project
- **Method:** `POST`
- **Validation:** ตรวจสอบผ่าน `CreateProjectDto` และ `ValidationPipe`
- **Body Structure:**
    - `type`: "PROJECT" (Enum)
    - `name`: string (Required)
    - `title`: string (Required)
    - `description`: string
    - `status`: "Planning" | "Completed" | "Archived" (Case-insensitive)
    - `startDate`: ISO8601 String
    - `deadline`: ISO8601 String
- **Success Response (201 Created):** คืนค่าข้อมูลที่สร้างสำเร็จ

### 1.4 Update Project
- **Method:** `PATCH`
- **Path:** `/projects/:id`
- **Body:** `UpdateProjectDto` (ส่งเฉพาะฟิลด์ที่ต้องการแก้ไข)

### 1.5 Recovery & Delete
- **Recovery:** `PATCH /projects/:id/recovery` สำหรับกู้คืนข้อมูลโครงการ
- **Delete:** `DELETE /projects/:id` สำหรับลบข้อมูลออกจากระบบ

---

## 2. Tasks Endpoints (`/tasks`)

### 2.1 Get All Tasks
- **Method:** `GET`
- **Example Response (200 OK):**
```json
[
  {
    "id": "task_1708730000000_abcd123",
    "name": "Setup Backend",
    "title": "Initialize NestJS Project",
    "priority": "LOW",
    "status": "DONE",
    "statusDelete": "ACTIVE"
  }
]
```

### 2.2 Create Task
- **Method:** `POST`
- **Description:** สร้างงานย่อยใหม่
- **Body Structure (CreateTaskDto):**
    * `name`: string (ชื่อผู้รับผิดชอบ)
    * `title`: string (หัวข้อของงาน)
    * `description`: string (รายละเอียดงาน)
    * `priority`: "LOW" | "MEDIUM" | "HIGH"
    * `startDate`: ISO Date String
    * `deadline`: ISO Date String
    * `estimatedHours`: number (ระยะเวลาที่คาดการณ์)
- **Success Response (201 Created):** คืนค่า Object งานที่สร้างสำเร็จพร้อม ID รูปแบบ `task_timestamp_random`

### 2.3 Update Task Status
- **Method:** `PATCH`
- **Path:** `/tasks/:id/status`
- **Description:** ใช้สำหรับสลับสถานะงาน (Toggle) ระหว่าง `IN_PROGRESS` และ `DONE`

### 2.4 Batch Field Update
- **Method:** `PATCH`
- **Path:** `/tasks`
- **Body:** Array ของ Object `{ id: string; data: Partial<TasksData> }`
- **Description:** อัปเดตข้อมูลหลายงานพร้อมกันในครั้งเดียว (Batch Update)

### 2.5 Task Maintenance (Inactive & Recovery)
- **Inactive:** `PATCH /tasks/:id/inactive` สำหรับปิดการใช้งานงานย่อย
- **Recovery:** `PATCH /tasks/:id/recovery` สำหรับกู้คืนข้อมูลที่ถูกลบหรือปิดใช้งาน

### 2.6 Delete Task
- **Method:** `DELETE`
- **Path:** `/tasks/:id`
- **Description:** ลบงานย่อยออกจากระบบ

---

## 3. Error Handling & Validation Standards

เพื่อให้เป็นไปตามข้อกำหนด **Error 500 ไม่เกิน 5 จุด** และมาตรฐานการจัดการ Exception:

* **400 Bad Request**: เกิดขึ้นเมื่อข้อมูลใน Request Body ไม่ตรงกับเงื่อนไขใน DTO (เช่น ส่งค่า priority ไม่ถูกต้อง)
* **404 Not Found**: เกิดขึ้นเมื่อไม่พบ ID ของ Project หรือ Task ที่ระบุในระบบ
* **Validation Strategy**: มีการใช้ `ValidationPipe` ใน Controller ทุกจุดเพื่อตรวจสอบความถูกต้องของข้อมูลก่อนส่งไปยัง Service Layer