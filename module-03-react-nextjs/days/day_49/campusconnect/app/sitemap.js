import { events } from "@/lib/data";
export default function sitemap(){const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";return ["","/events","/resources","/announcements",...events.map(e=>`/events/${e.id}`)].map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:0.7}));}
