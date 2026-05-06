import Link from "next/link"
import Image from "next/image"

const panels = {
  large: {
    label: "Total Security",
    sublabel: "All-in-one protection for every device",
    href: "/shop?category=TOTAL_SECURITY",
    image: "/images/products/Bitdefender-ESD-TS-5-12-EN.jpg",
  },
  small: [
    {
      label: "Internet Security",
      sublabel: "Advanced online protection",
      href: "/shop?category=INTERNET_SECURITY",
      image: "/images/products/Bitdefender-ESD-IS-3-12-EN.jpg",
    },
    {
      label: "Family Pack",
      sublabel: "Protect up to 15 devices",
      href: "/shop?category=FAMILY_PACK",
      image: "/images/products/Bitdefender-ESD-FP-15-12-EN (3).jpg",
    },
    {
      label: "VPN",
      sublabel: "Private, encrypted browsing",
      href: "/shop?category=VPN",
      image: "/images/products/Bitdefender-ESD-VPN-5-12-EN (1).jpg",
    },
  ],
}

function Panel({
  label,
  sublabel,
  href,
  image,
}: {
  label: string
  sublabel: string
  href: string
  image: string
}) {
  return (
    <Link href={href} className="relative overflow-hidden rounded-xl bg-[#0f2040] group block">
      {/* Product image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={label}
          fill
          className="object-contain p-6 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />
      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col justify-end h-full">
        <p className="text-slate-400 text-xs mb-1">{sublabel}</p>
        <h3 className="text-white font-bold text-lg leading-tight">{label}</h3>
        <span className="text-[#3b82f6] text-sm font-medium mt-1 group-hover:underline">
          Shop Now →
        </span>
      </div>
    </Link>
  )
}

export function NewArrival() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#1e6ef5] text-sm font-semibold mb-1">Featured</p>
          <h2 className="text-2xl font-bold text-[#0a1628]">New Arrival</h2>
        </div>

        {/* Grid: 1 large left + 3 small right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
          {/* Large left panel */}
          <div className="h-full">
            <Panel {...panels.large} />
          </div>

          {/* 3 small right panels */}
          <div className="grid grid-rows-3 gap-4 h-full">
            {panels.small.map((panel) => (
              <Panel key={panel.href} {...panel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
