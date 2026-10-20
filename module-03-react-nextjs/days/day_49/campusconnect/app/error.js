"use client";
export default function GlobalError({error,reset}){return <section className="page-shell error-state"><span className="empty-icon">!</span><h1>Something went wrong</h1><p>We couldn’t load this page right now. Please try again.</p><button className="button" onClick={()=>reset()}>Try again</button>{process.env.NODE_ENV==="development"&&<pre>{error.message}</pre>}</section>;}
