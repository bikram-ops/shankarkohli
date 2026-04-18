export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://www.betazu.com/api/sites/form/45807635-2459-41f0-bf66-ced3feaeccdd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.text();

    return new Response(data, {
      status: res.status,
    });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}