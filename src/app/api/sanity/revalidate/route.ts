import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { tagsForSanityDocument } from "@/lib/cache-tags";
import { serverEnv } from "@/lib/env.server";

// Payload shape produced by the Sanity webhook projection: `{ "type": _type, "slug": slug.current }`
type WebhookPayload = {
  type?: string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, serverEnv.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?.type) {
      return NextResponse.json({ message: "Bad Request: missing document type" }, { status: 400 });
    }

    const tags = tagsForSanityDocument(body.type, body.slug);

    if (tags.length === 0) {
      return NextResponse.json({ message: `Ignored document type: ${body.type}`, revalidated: false });
    }

    for (const tag of tags) revalidateTag(tag, { expire: 0 });

    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[sanity-revalidate]", message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
