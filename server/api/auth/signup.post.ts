import jwt from "jsonwebtoken";
import { db } from "~~/server/utils/db";
import { usersTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs"
export type AuthBody = {
  email: string;
  password: string;
};

export default defineEventHandler(async (e) => {
  try {
    const body = await readBody<AuthBody>(e);

    if (body.email.trim() === "" || body.password.trim() === "") {
      throw createError({
        statusCode: 400,
        message: "Email or Password Cannot Be Null",
      });
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, body.email));

    if (user.length > 0) {
      setResponseStatus(e, 400);
      return {
        message: "Email Exists",
        code: 400,
      };
    }

    const salt = bcryptjs.genSaltSync(10)

    const hashedPassword = bcryptjs.hashSync(body.password , salt)

    const insertedData = await db
      .insert(usersTable)
      .values({ email: body.email, password: hashedPassword });

    console.log(insertedData);

    return {
      code: 201,
      message: "User Inserted Successfully",
    };
  } catch (error) {
    console.error(error);

    setResponseStatus(e, 400);

    return {
      message: `An error Ocuured ${error}`,
      code: 400,
    };
  }
});
