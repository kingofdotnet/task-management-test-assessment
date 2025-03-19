src/
│
├── main.ts
├── app.module.ts
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   └── decorators/
│       └── roles.decorator.ts
│
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   └── schemas/
│       └── user.schema.ts
│
├── companies/
│   ├── companies.module.ts
│   ├── companies.service.ts
│   ├── companies.controller.ts
│   ├── dto/
│   │   ├── create-company.dto.ts
│   │   └── update-company.dto.ts
│   └── schemas/
│       └── company.schema.ts
│
├── projects/
│   ├── projects.module.ts
│   ├── projects.service.ts
│   ├── projects.controller.ts
│   ├── dto/
│   │   ├── create-project.dto.ts
│   │   └── update-project.dto.ts
│   └── schemas/
│       └── project.schema.ts
│
├── permissions/
│   ├── permissions.module.ts
│   ├── permissions.service.ts
│   ├── permissions.controller.ts
│   └── schemas/
│       └── permission.schema.ts
│
└── common/
    ├── guards/
    │   └── jwt-auth.guard.ts
    ├── interceptors/
    └── filters/