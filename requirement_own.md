## Problem Deadline 8 March

🧩 Model Set 4: Task & Project Tracking
Core Models

Project 
Task
Description ระบบติดตามงานและโปรเจค เหมาะสำหรับฝึก workflow และ state-based logic

## Important

- ทุก request และ response ต้องกำหนด interface แบบ narrow type
- ใช้ TypeScript strict mode (strict: true ใน tsconfig.json)
- ESLint จะตรวจสอบและป้องกันการใช้ any type อัตโนมัติ

## Team Structure

- รายชื่อสมาชิกต้องถูกระบุไว้ใน package.json (key contributors)
- Database : lowdb recommened
- Must use Enum at least 1 
- Do not use `any` type

```
.
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── modules/
│   │   └── example/
│   │       └── dto/
│   │
│   └── common/
│       ├── interfaces/
│       └── utils/
│
├── docs/
│   ├── api-specification.md
│   ├── data-model.md
│   └── uml-diagram.png
├── subjects/
│   ├── requirement.md
│   ├── submission.md
│   ├── evaluation.md
│   └── models.md
│
├── package.json
├── tsconfig.json
└── README.md
```

note in package.json

```
{
  "project": {
    "model": {
      "id": "1",
      "name": "Blog / Content Platform"
    },
    "sumStudentId": 192370371
  }
}
```

รายชื่อสมาชิกในกลุ่มต้องถูกระบุไว้ใน key contributors ภายในไฟล์ package.json โดยมีรูปแบบดังนี้:

```
"contributors": [
  {
    "fullname": "ชื่อ-นามสกุล",
    "username": "github-username",
    "studentId": "รหัสนักศึกษา"
  }
]
```

## API Design

ใช้ HTTP Method ให้ถูกต้องตามหลัก REST API:
GET /resources - ดึงข้อมูลทั้งหมด
GET /resources/{id} - ดึงข้อมูลตาม ID
POST /resources - สร้างข้อมูลใหม่
PUT /resources/{id} - อัปเดตข้อมูลทั้งหมด
PATCH /resources/{id} - อัปเดตข้อมูลบางส่วน
DELETE /resources/{id} - ลบข้อมูล

ทุก API ต้องใช้ Response Format แบบเดียวกัน:

```
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}
```

## Validation & Error Handling
ทุก API ต้องมีการ validate ข้อมูล
ใช้ HTTP Status Code ที่เหมาะสม:
200 - OK (GET, PUT, PATCH สำเร็จ)
201 - Created (POST สำเร็จ)
400 - Bad Request (Validation error)
403 - Forbidden (ไม่มีสิทธิ์)
404 - Not Found (ไม่พบข้อมูล)
500 - Internal Server Error (Server error)
⚠️ ไม่ควรเกิด Error 500 จาก logic ที่สามารถป้องกันได้
หากพบ Error 500 มากกว่า 5 จุด อาจมีผลต่อการให้คะแนน

## Docs [important]
- API Specification : Docs API ทุก endpoint
- Data Model Documentation : Docs อธิบาย data model  
- UML Diagram : mind map UML ของ data model 




