# Data Model Documentation

เอกสารฉบับนี้อธิบายโครงสร้างข้อมูลของระบบ Task-Project Tracking ซึ่งออกแบบตามหลัก Object-Oriented Programming (OOP) โดยมีความสอดคล้องกับ UML Diagram และข้อกำหนดของ NestJS Backend API

## 1. System Overview
ระบบถูกออกแบบมาให้จัดการข้อมูลสองส่วนหลักคือ **Projects** และ **Tasks** โดยใช้ระบบ File-based storage (JSON) ในการจัดเก็บข้อมูล และมีระบบ Validation ที่เข้มงวดผ่าน Data Transfer Objects (DTOs)

---

## 2. Entity Specifications

### 2.1 ProjectData (Interface/Entity)
เป็นโมเดลหลักสำหรับจัดเก็บข้อมูลโครงการ
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | number | Unique identifier (Primary Key) |
| `type` | Type (Enum) | ประเภทข้อมูล (ค่าคงที่: PROJECT) |
| `name` | string | ชื่อผู้รับผิดชอบโครงการ |
| `title` | string | หัวข้อของโครงการ |
| `description` | string | รายละเอียดโดยสังเขป |
| `status` | projectStatus | สถานะ (PLANNING, COMPLETED, ARCHIVED) |
| `startDate` | Date | วันที่เริ่มโครงการ |
| `deadline` | Date | วันสิ้นสุดโครงการ |
| `createdAt` | Date | วันที่สร้าง Record |
| `updatedAt` | Date | วันที่แก้ไขล่าสุด |
| `statusDelete` | Enum | สถานะการลบ (ACTIVE / INACTIVE) |
| `taskIds` | string[] | รายการ ID ของงานที่เชื่อมโยงอยู่ |

### 2.2 TasksData (Interface/Entity)
เป็นโมเดลสำหรับงานย่อยที่อยู่ภายใต้โครงการ
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique identifier (UUID/String) |
| `name` | string | ชื่อผู้รับผิดชอบงาน |
| `title` | string | หัวข้อของงานย่อย |
| `description` | string | รายละเอียดงาน |
| `priority` | Enum | ระดับความสำคัญ (LOW, MEDIUM, HIGH) |
| `status` | Status (Enum) | สถานะงาน (DONE, IN_PROGRESS) |
| `estimatedHours`| number | ระยะเวลาประเมิน (ชั่วโมง) |
| `startDate` | Date | วันที่เริ่มงาน |
| `deadline` | Date | วันสิ้นสุดงาน |
| `statusDelete` | Enum | สถานะการลบ (ACTIVE / INACTIVE) |

---

## 3. Data Integrity & Validation

### 3.1 Enumerations
เพื่อให้ข้อมูลเป็นมาตรฐานเดียวกัน ระบบมีการใช้ Enum ดังนี้:
- **Type**: `TASKS`, `PROJECT`
- **projectStatus**: `PLANNING`, `COMPLETED`, `ARCHIVED`
- **Status (Task)**: `DONE`, `IN_PROGRESS`
- **Priority**: `LOW`, `MEDIUM`, `HIGH`

### 3.2 Relationships
- **Association (1:N)**: `Projects Service` มีความสัมพันธ์กับ `Tasks Service` แบบ **1 ต่อ 0..*** (หนึ่งโปรเจคประกอบด้วยหลายงาน หรือไม่มีเลยก็ได้) โดยเชื่อมโยงผ่าน `taskIds`

---

## 4. Implementation Details
- **Validation**: ใช้ `class-validator` ใน DTO เพื่อตรวจสอบ Data Type และ Constraints ก่อนเข้าสู่ Service Layer
- **Auto-Transformation**: มีการใช้ `@Transform` ใน `CreateProjectDto` เพื่อจัดการข้อมูลสถานะให้ถูกต้องตาม Enum แม้ผู้ใช้จะส่งตัวพิมพ์เล็กมา