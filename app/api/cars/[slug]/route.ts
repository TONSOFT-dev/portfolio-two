import { NextResponse } from "next/server";
import { cars } from "@/lib/data/cars";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);

  if (!car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car);
}
