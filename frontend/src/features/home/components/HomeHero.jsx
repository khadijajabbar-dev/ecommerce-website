import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const categories = [
  {
    id: 1,
    title: "Electronics & Gadgets",
    subtitle: "Discover the latest tech, smartphones, and laptops.",
    img: "/cat_electronics.jpg",
    opacityRange: [0, 0.10, 0.125],
    opacityVals: [1, 1, 0],
    textOpacityRange: [0, 0.11, 0.12],
    textOpacityVals: [1, 1, 0],
    scaleRange: [0, 0.125],
    scaleVals: [1, 1.2],
    isFirst: true,
  },
  {
    id: 2,
    title: "Premium Fashion",
    subtitle: "Upgrade your wardrobe with stylish clothing and accessories.",
    img: "/cat_fashion.jpg",
    opacityRange: [0.10, 0.125, 0.225, 0.250],
    opacityVals: [0, 1, 1, 0],
    textOpacityRange: [0.13, 0.14, 0.23, 0.24],
    textOpacityVals: [0, 1, 1, 0],
    scaleRange: [0.10, 0.250],
    scaleVals: [1.2, 1],
    isFirst: false,
  },
  {
    id: 3,
    title: "Home & Furniture",
    subtitle: "Make your house a home with our premium decor collection.",
    img: "/cat_home.jpg",
    opacityRange: [0.225, 0.250, 0.350, 0.375],
    opacityVals: [0, 1, 1, 0],
    textOpacityRange: [0.26, 0.27, 0.36, 0.37],
    textOpacityVals: [0, 1, 1, 0],
    scaleRange: [0.225, 0.375],
    scaleVals: [1, 1.2],
    isFirst: false,
  },
  {
    id: 4,
    title: "Beauty & Personal Care",
    subtitle: "Look and feel your best with top skincare and beauty products.",
    img: "/cat_beauty.jpg",
    opacityRange: [0.350, 0.375, 0.475, 0.500],
    opacityVals: [0, 1, 1, 0],
    textOpacityRange: [0.38, 0.39, 0.48, 0.49],
    textOpacityVals: [0, 1, 1, 0],
    scaleRange: [0.350, 0.500],
    scaleVals: [1.2, 1],
    isFirst: false,
  },
  {
    id: 5,
    title: "Jewelry & Watches",
    subtitle: "Adorn yourself with elegant necklaces, rings, and luxury timepieces.",
    img: "/cat_jewelry.jpg",
    opacityRange: [0.475, 0.500, 0.600, 0.625],
    opacityVals: [0, 1, 1, 0],
    textOpacityRange: [0.51, 0.52, 0.61, 0.62],
    textOpacityVals: [0, 1, 1, 0],
    scaleRange: [0.475, 0.625],
    scaleVals: [1, 1.2],
    isFirst: false,
  },
  {
    id: 6,
    title: "Sports & Outdoors",
    subtitle: "Gear up for your next adventure with our outdoor essentials.",
    img: "/cat_sports.jpg",
    opacityRange: [0.600, 0.625, 0.725, 0.750],
    opacityVals: [0, 1, 1, 0],
    textOpacityRange: [0.63, 0.64, 0.73, 0.74],
    textOpacityVals: [0, 1, 1, 0],
    scaleRange: [0.600, 0.750],
    scaleVals: [1.2, 1],
    isFirst: false,
  },
  {
    id: 7,
    title: "Food & Groceries",
    subtitle: "Fresh organic produce and daily essentials delivered to your door.",
    img: "/cat_food.jpg",
    opacityRange: [0.725, 0.750, 0.850, 0.875],
    opacityVals: [0, 1, 1, 0],
    textOpacityRange: [0.76, 0.77, 0.86, 0.87],
    textOpacityVals: [0, 1, 1, 0],
    scaleRange: [0.725, 0.875],
    scaleVals: [1, 1.2],
    isFirst: false,
  },
  {
    id: 8,
    title: "Toys & Hobbies",
    subtitle: "Fun and engaging toys, board games, and building blocks for all ages.",
    img: "/cat_toys.jpg",
    opacityRange: [0.850, 0.875, 1],
    opacityVals: [0, 1, 1],
    textOpacityRange: [0.88, 0.89, 1],
    textOpacityVals: [0, 1, 1],
    scaleRange: [0.850, 1],
    scaleVals: [1.2, 1],
    isFirst: false,
  }
];

const CategorySlide = ({ cat, scrollYProgress }) => {
  const imgOpacity = useTransform(scrollYProgress, cat.opacityRange, cat.opacityVals, { clamp: true });
  const textOpacity = useTransform(scrollYProgress, cat.textOpacityRange, cat.textOpacityVals, { clamp: true });
  const scale = useTransform(scrollYProgress, cat.scaleRange, cat.scaleVals, { clamp: true });
  const y = useTransform(scrollYProgress, cat.scaleRange, [50, -50], { clamp: true });
  
  // Hard hide the text container when it is completely out of its visibility range
  // This completely solves any ghosting/opacity bugs in the browser
  const textDisplay = useTransform(scrollYProgress, (p) => {
    const min = cat.textOpacityRange[0] - 0.01;
    const max = cat.textOpacityRange[cat.textOpacityRange.length - 1] + 0.01;
    return (p >= min && p <= max) ? "flex" : "none";
  });
  
  return (
    <>
      <motion.img
        src={cat.img}
        alt={cat.title}
        style={{ opacity: imgOpacity, scale }}
        className="absolute inset-0 w-full h-full object-cover origin-center z-0"
      />
      <motion.div 
        style={{ opacity: textOpacity, y, display: textDisplay }} 
        className="absolute inset-0 z-20 flex-col items-center justify-center px-4 text-center pointer-events-none"
      >
        <span className="inline-block px-4 py-1.5 bg-primary/80 backdrop-blur-md text-white text-sm font-bold rounded-full mb-6 uppercase tracking-wider shadow-lg">
          {cat.isFirst ? "Scroll to Explore Categories" : "Top Categories"}
        </span>
        <h2 className="text-5xl sm:text-6xl lg:text-[76px] font-black leading-[1.1] mb-6 drop-shadow-2xl text-white">
          {cat.title}
        </h2>
        <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-relaxed font-light drop-shadow-lg max-w-3xl">
          {cat.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <Link 
            to="/marketplace" 
            className="inline-flex justify-center items-center px-10 py-4 bg-primary text-white text-lg font-bold rounded-lg shadow-2xl shadow-primary/40 hover:bg-primary/90 transition transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </motion.div>
    </>
  );
};

const HomeHero = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress within a much taller container (900vh for 8 categories)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="h-[900vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Category Slides */}
        {categories.map((cat) => (
          <CategorySlide key={cat.id} cat={cat} scrollYProgress={scrollYProgress} />
        ))}

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-0 left-0 h-2 bg-white/20 w-full z-30">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.5)]" 
            style={{ width: progressWidth }} 
          />
        </div>
        
      </div>
    </section>
  );
};

export default HomeHero;
