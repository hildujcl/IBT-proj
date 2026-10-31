import { notFound } from "next/navigation";
import { getDish, getDishes } from "../../lib/dishes";
import { siteUrl } from "../../lib/site";
import AddToCartButton from "../../components/AddToCartButton";

export function generateStaticParams() {
  return getDishes().map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish could not be found.",
    };
  }

  const pageUrl = `${siteUrl}/menu/${dish.id}`;

  return {
    title: dish.name,

    description: dish.summary,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.summary,
      url: pageUrl,
      type: "website",
      images: [
        {
          url: `${pageUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} from Addis Eats`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${dish.name} | Addis Eats`,
      description: dish.summary,
      images: [`${pageUrl}/opengraph-image`],
    },
  };
}

export default async function DishDetailsPage({ params }) {
  const { id } = await params;
  const dish = getDish(id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd,
        }}
      />

      <div className="detail-card">
        <div className="detail-image">{dish.emoji}</div>

        <div className="detail-content">
          <p className="eyebrow">{dish.category}</p>

          <h1>{dish.name}</h1>

          <p>{dish.summary}</p>

          <h2>{dish.price} ETB</h2>

          <AddToCartButton dish={dish} />

          <p>
            <a href="/menu">← Back to Menu</a>
          </p>
        </div>
      </div>
    </section>
  );
}
