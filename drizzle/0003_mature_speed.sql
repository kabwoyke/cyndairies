CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_categories` (
	`user_id` integer,
	`category_id` integer,
	PRIMARY KEY(`user_id`, `category_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_name` text NOT NULL,
	`stock_quantity` integer NOT NULL,
	`selling_price` real NOT NULL,
	`cost_price` real NOT NULL
);
