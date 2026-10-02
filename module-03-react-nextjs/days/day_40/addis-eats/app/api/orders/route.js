export async function POST(request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const phone = body.phone?.trim();

    if (!name || !phone) {
      return Response.json(
        {
          success: false,
          message: "Name and phone are required.",
        },
        { status: 422 },
      );
    }

    if (!/^09\d{8}$/.test(phone)) {
      return Response.json(
        {
          success: false,
          message: "Invalid Ethiopian phone number.",
        },
        { status: 422 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Order placed successfully.",
        order: {
          name,
          phone,
          total: 350,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Invalid request.",
      },
      { status: 400 },
    );
  }
}
