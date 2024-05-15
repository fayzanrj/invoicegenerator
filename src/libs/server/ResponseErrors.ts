import { NextResponse } from "next/server";

export const ThrowServerError = () => {
  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
};

export const ThrowIncompleteError = (): NextResponse => {
  return NextResponse.json({ message: "Incomplete data" }, { status: 400 });
};

export const ThrowUnAuthorizedError = (): NextResponse => {
  return NextResponse.json({ message: "Not authorized" }, { status: 401 });
};

export const ThrowNotFoundError = (message: string): NextResponse => {
  return NextResponse.json({ message }, { status: 404 });
};
