import { ratelimit } from "@/lib/rate-limit";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(
    "🔧 Middleware executado para:",
    request.method,
    request.nextUrl.pathname
  );

  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";

  console.log("🌐 IP detectado:", ip);

  try {
    const { success, remaining } = await ratelimit.limit(ip);

    if (!success) {
      console.log("❌ Rate limit excedido para IP:", ip);
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Adicionar header informativo
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    console.log("✅ Rate limit processado com sucesso");

    return response;
  } catch (error) {
    console.error("❌ Erro no rate limiting:", error);
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/api/:path*"],
};
