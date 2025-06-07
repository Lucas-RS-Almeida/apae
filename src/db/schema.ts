import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";

export const usersTablePermissionEnun = pgEnum("users_table_permission", [
  "user",
  "admin",
  "technical",
]);

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  permission: usersTablePermissionEnun("permission")
    .notNull()
    .$default(() => "user"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Intermediate table to relate n-n to users, patients and charts
export const usersToPatientsAndDiagnosesTable = pgTable("users_to_patients", {
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patientsTable.id),
  chartId: uuid("chart_id")
    .notNull()
    .references(() => diagnosesTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$default(() => new Date()),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToPatientsAndDiagnoses: many(usersToPatientsAndDiagnosesTable),
}));

export const patientsSexEnum = pgEnum("patients_sex", ["male", "female"]);

export const patientsTable = pgTable("patients", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  responsiblePersonName: text("responsible_person_name").notNull(),
  description: text("description").notNull(),
  email: text("email"),
  cellPhone: text("cell_phone"),
  cpf: text("cpf").notNull(),
  address: text("address").notNull(),
  district: text("district").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  deficiency: text("deficiency").notNull(),
  severity: integer("severity")
    .notNull()
    .$default(() => 0), // 0 - 4
  inTreatment: boolean("in_service")
    .notNull()
    .$default(() => true),
  sex: patientsSexEnum("sex").notNull(), // male, female
  homeNumber: text("home_number"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const patientsTableRelations = relations(patientsTable, ({ many }) => ({
  usersToPatientsAndDiagnoses: many(usersToPatientsAndDiagnosesTable),
}));

export const diagnosesTable = pgTable("diagnoses", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patientsTable.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  description: text("description").notNull(),
  severity: integer("severity")
    .notNull()
    .$default(() => 0), // 0 - 4,
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const diagnosesTableRelations = relations(diagnosesTable, ({ one }) => ({
  patient: one(patientsTable, {
    fields: [diagnosesTable.patientId],
    references: [patientsTable.id],
  }),
  user: one(usersTable, {
    fields: [diagnosesTable.userId],
    references: [usersTable.id],
  }),
}));

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const accountsTables = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationsTables = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});
