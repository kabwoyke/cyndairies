import { relations } from "drizzle-orm";
import { int, sqliteTable, text, integer, real , primaryKey  } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: int("id").primaryKey({autoIncrement:true}).notNull(),
    email:text("email").notNull().unique(),
    password:text("password").notNull(),
    created_at: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),

});

export const products = sqliteTable("products" , {

    id:int("id").primaryKey({autoIncrement:true}).notNull(),
    product_name:text("product_name").notNull(),
    stock_quantity:integer("stock_quantity").notNull(),
    selling_price:real("selling_price").notNull(),
    cost_price:real("cost_price").notNull()

})

export const categories = sqliteTable("categories" , {

    id:int("id").primaryKey({autoIncrement:true}).notNull(),
    name:text("name").notNull()

})

export const productCategories = sqliteTable("product_categories" , {
    productId:integer("user_id").references(() => usersTable.id),
    categoryId:integer("category_id").references(() => categories.id),
} , (table) => ({pk:primaryKey({columns:[table.productId , table.categoryId]})})
)

export const productsRelations = relations(products, ({ many }) => ({
  userGroups: many(productCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  userGroups: many(productCategories),
}));




// export const usersTable = sqliteTable("users_table", {
//   id: int().primaryKey({ autoIncrement: true }),
//   name: text().notNull(),
//   age: int().notNull(),
//   email: text().notNull().unique(),
// })