import { dishes } from "@/lib/dishes";

export async function GET() {
  return Response.json({
    success: true,
    data: dishes,
  });
}
