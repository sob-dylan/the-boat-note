import {
  pgTable,
  uuid,
  timestamp,
  text,
  foreignKey,
  pgPolicy,
  jsonb,
  boolean,
  bigint,
  integer,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const orderStatus = pgEnum("order_status", [
  "created",
  "attempted",
  "paid",
  "failed",
]);
export const pricingPlanInterval = pgEnum("pricing_plan_interval", [
  "day",
  "week",
  "month",
  "year",
]);
export const pricingType = pgEnum("pricing_type", ["one_time", "recurring"]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "created",
  "active",
  "pending",
  "halted",
  "cancelled",
  "completed",
  "expired",
]);

export const workspaces = pgTable("workspaces", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  workspaceOwner: uuid("workspace_owner").notNull(),
  title: text().notNull(),
  iconId: text("icon_id").notNull(),
  data: text(),
  inTrash: text("in_trash"),
  bannerUrl: text("banner_url"),
  logo: text(),
});

export const files = pgTable(
  "files",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
    title: text().notNull(),
    iconId: text("icon_id").notNull(),
    data: text(),
    inTrash: text("in_trash"),
    bannerUrl: text("banner_url"),
    workspaceId: uuid("workspace_id"),
    folderId: uuid("folder_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.folderId],
      foreignColumns: [folders.id],
      name: "files_folder_id_folders_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.workspaceId],
      foreignColumns: [workspaces.id],
      name: "files_workspace_id_workspaces_id_fk",
    }).onDelete("cascade"),
  ]
);

export const folders = pgTable(
  "folders",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
    title: text().notNull(),
    iconId: text("icon_id").notNull(),
    data: text(),
    inTrash: text("in_trash"),
    bannerUrl: text("banner_url"),
    workspaceId: uuid("workspace_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.workspaceId],
      foreignColumns: [workspaces.id],
      name: "folders_workspace_id_workspaces_id_fk",
    }).onDelete("cascade"),
  ]
);

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().notNull(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    billingAddress: jsonb("billing_address"),
    paymentMethod: jsonb("payment_method"),
    email: text(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [table.id],
      name: "users_id_fkey",
    }),
    pgPolicy("Can update own user data.", {
      as: "permissive",
      for: "update",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = id)`,
    }),
    pgPolicy(" Everyone Can view own user data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
  ]
);

export const customers = pgTable(
  "customers",
  {
    id: uuid().primaryKey().notNull(),
    razorpayCustomerId: text("razorpay_customer_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [users.id],
      name: "customers_id_fkey",
    }),
  ]
);

export const products = pgTable(
  "products",
  {
    id: text().primaryKey().notNull(),
    active: boolean(),
    name: text(),
    description: text(),
    image: text(),
    metadata: jsonb(),
  },
  (table) => [
    pgPolicy("Allow public read-only access.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const prices = pgTable(
  "prices",
  {
    id: text().primaryKey().notNull(),
    productId: text("product_id"),
    active: boolean(),
    description: text(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    unitAmount: bigint("unit_amount", { mode: "number" }),
    currency: text(),
    type: pricingType(),
    interval: pricingPlanInterval(),
    intervalCount: integer("interval_count"),
    trialPeriodDays: integer("trial_period_days"),
    metadata: jsonb(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "prices_product_id_fkey",
    }),
    pgPolicy("Allow public read-only access.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const orders = pgTable(
  "orders",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    userId: uuid("user_id"),
    amount: integer().notNull(),
    currency: text().default("INR").notNull(),
    receipt: text(),
    razorpayOrderId: text("razorpay_order_id").notNull(),
    status: orderStatus().default("created").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "orders_user_id_fkey",
    }),
    unique("orders_razorpay_order_id_key").on(table.razorpayOrderId),
    pgPolicy("Can view own order data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
  ]
);

export const payments = pgTable(
  "payments",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    userId: uuid("user_id"),
    orderId: uuid("order_id"),
    razorpayPaymentId: text("razorpay_payment_id").notNull(),
    razorpayOrderId: text("razorpay_order_id").notNull(),
    razorpaySignature: text("razorpay_signature").notNull(),
    amount: integer().notNull(),
    currency: text().default("'INR'").notNull(),
    status: text().notNull(),
    method: jsonb(),
    capturedAt: timestamp("captured_at", { withTimezone: true, mode: "string" })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "payments_order_id_fkey",
    }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "payments_user_id_fkey",
    }),
    unique("payments_razorpay_payment_id_key").on(table.razorpayPaymentId),
    pgPolicy("Can view own payment data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
  ]
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    status: subscriptionStatus(),
    priceId: text("price_id"),
    quantity: integer(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    created: timestamp({ withTimezone: true, mode: "string" })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
      mode: "string",
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    currentPeriodEnd: timestamp("current_period_end", {
      withTimezone: true,
      mode: "string",
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true, mode: "string" }),
    cancelAt: timestamp("cancel_at", { withTimezone: true, mode: "string" }),
    canceledAt: timestamp("canceled_at", {
      withTimezone: true,
      mode: "string",
    }),
    trialStart: timestamp("trial_start", {
      withTimezone: true,
      mode: "string",
    }),
    trialEnd: timestamp("trial_end", { withTimezone: true, mode: "string" }),
    razorpaySubscriptionId: text("razorpay_subscription_id"),
    razorpayPlanId: text("razorpay_plan_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.priceId],
      foreignColumns: [prices.id],
      name: "subscriptions_price_id_fkey",
    }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "subscriptions_user_id_fkey",
    }),
    unique("subscriptions_razorpay_subscription_id_key").on(
      table.razorpaySubscriptionId
    ),
    pgPolicy("Can only view own subs data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
  ]
);
