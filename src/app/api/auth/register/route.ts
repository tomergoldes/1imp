import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 200;
const MAX_NAME_LENGTH = 100;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail) || normalizedEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (name != null && (typeof name !== "string" || name.length > MAX_NAME_LENGTH)) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (exist) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: typeof name === "string" ? name.trim() : null,
        email: normalizedEmail,
        password: hashedPassword,
      },
      // Never return the password hash to the client.
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
