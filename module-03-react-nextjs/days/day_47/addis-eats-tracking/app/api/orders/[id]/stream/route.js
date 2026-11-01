import { demoOrder, demoStatuses } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = await params;

  if (id !== demoOrder.id) {
    return new Response("Order not found", {
      status: 404,
    });
  }

  const encoder = new TextEncoder();
  let index = 0;
  let timer;

  const stream = new ReadableStream({
    start(controller) {
      function sendUpdate() {
        if (request.signal.aborted) {
          clearInterval(timer);
          return;
        }

        const status = demoStatuses[index];

        const data = {
          status,
          time: new Date().toISOString(),
        };

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

        index += 1;

        if (index >= demoStatuses.length) {
          clearInterval(timer);
          controller.close();
        }
      }

      sendUpdate();

      timer = setInterval(sendUpdate, 5000);

      request.signal.addEventListener(
        "abort",
        () => {
          clearInterval(timer);
          try {
            controller.close();
          } catch {
            // The connection may already be closed.
          }
        },
        { once: true },
      );
    },

    cancel() {
      clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
