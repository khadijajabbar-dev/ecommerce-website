export const CATEGORIES = [
  {
    value: "fashion",
    label: "Fashion & Clothing",
    description: "Clothing, shoes, bags & accessories",
    icon: "shirt",
    color: "bg-[#fde8df] text-[#c65e45]",
  },
  {
    value: "electronics",
    label: "Electronics",
    description: "Smartphones, laptops, accessories & more",
    icon: "headphones",
    color: "bg-[#dff3f2] text-[#0f766e]",
  },
  {
    value: "grocery",
    label: "Grocery & Food",
    description: "Everyday essentials and pantry picks",
    icon: "grocery",
    color: "bg-[#eef6e8] text-[#3f7d3a]",
  },
  {
    value: "beauty",
    label: "Beauty & Personal Care",
    description: "Skincare, makeup, fragrances & more",
    icon: "beauty",
    color: "bg-[#fdecef] text-[#bd5555]",
  },
  {
    value: "home",
    label: "Home & Living",
    description: "Decor, furniture and home comfort",
    icon: "sofa",
    color: "bg-[#e8f1ff] text-[#355f99]",
  },
  {
    value: "jewellery",
    label: "Jewellery",
    description: "Earrings, necklaces, rings & more",
    icon: "gem",
    color: "bg-[#fff4db] text-[#b7791f]",
  },
  {
    value: "other",
    label: "Other",
    description: "Everything else from trusted sellers",
    icon: "grid",
    color: "bg-[#f1f5f9] text-[#475569]",
  },
];

export const getCategoryLabel = (value) =>
  CATEGORIES.find((category) => category.value === value)?.label || value;

export const getCategoryIcon = (value) =>
  CATEGORIES.find((category) => category.value === value)?.icon || "grid";