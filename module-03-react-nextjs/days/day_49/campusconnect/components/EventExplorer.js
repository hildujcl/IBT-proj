"use client";
import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
export default function EventExplorer({ events }) {
 const [query,setQuery]=useState(""); const [category,setCategory]=useState("All");
 const filtered=useMemo(()=>events.filter(e=>(category==="All"||e.category===category)&&`${e.title} ${e.description} ${e.location}`.toLowerCase().includes(query.toLowerCase())),[events,query,category]);
 return <><div className="filters"><label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Search events</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search events, workshops..."/></label><label className="sr-only" htmlFor="event-category">Filter by category</label><select id="event-category" value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{[...new Set(events.map(e=>e.category))].map(c=><option key={c}>{c}</option>)}</select><span className="results-count">{filtered.length} events</span></div>{filtered.length ? <div className="event-grid">{filtered.map(event=><EventCard key={event.id} event={event}/>)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h2>No events found</h2><p>Try another search or choose a different category.</p><button className="button button-secondary" onClick={()=>{setQuery("");setCategory("All")}}>Clear filters</button></div>}</>;
}
