import { NextResponse } from "next/server";
import { cars } from "@/lib/data/cars";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");

  let filteredCars = cars;

  if (brand) {
    filteredCars = filteredCars.filter(
      (car) => car.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (type) {
    filteredCars = filteredCars.filter(
      (car) => car.type.toLowerCase() === type.toLowerCase()
    );
  }

  return NextResponse.json(filteredCars);
}
