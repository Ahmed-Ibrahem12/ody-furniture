const bedroomImages = Object.values(
  import.meta.glob("../assets/products/bedroom/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  }),
);

const decorImages = Object.values(
  import.meta.glob("../assets/products/decor/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: { w: 500, format: "webp" },
  }),
);

const desksImages = Object.values(
  import.meta.glob("../assets/products/desks/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: { w: 500, format: "webp" },
  }),
);

const chairsImages = Object.values(
  import.meta.glob("../assets/products/chairs/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: { w: 500, format: "webp" },
  }),
);

const livingroomImages = Object.values(
  import.meta.glob("../assets/products/livingroom/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: { w: 500, format: "webp" },
  }),
);

const tablesImages = Object.values(
  import.meta.glob("../assets/products/tables/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: { w: 500, format: "webp" },
  }),
);

const sofaImages = Object.values(
  import.meta.glob("../assets/products/sofa/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: { w: 500, format: "webp" },
  }),
);

const kanabImages = Object.values(
  import.meta.glob("../assets/products/kanab/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: { w: 500, format: "webp" },
  }),
);

const woodTypes = [
  "خشب البلوط",
  "خشب الجوز",
  "خشب الصنوبر",
  "خشب الساج",
  "خشب الزان",
];
const finishes = [
  "تشطيب مطفي",
  "تشطيب لامع",
  "تشطيب طبيعي",
  "تشطيب رمادي عصري",
];
const pick = (items, index) => items[index % items.length];
const randomPrice = (min, max) =>
  Number((Math.random() * (max - min) + min).toFixed(2));
const randomDiscount = () =>
  Math.random() > 0.55 ? [5, 10, 15, 20, 25][Math.floor(Math.random() * 5)] : 0;

const sectionsConfig = [
  {
    images: bedroomImages,
    key: "bedroom",
    room: "غرفة نوم",
    priceRange: [499, 1899],
    types: [
      "سرير مزدوج",
      "سرير مفرد",
      "دولاب ملابس",
      "كومودينو بأدراج",
      "تسريحة أنيقة",
      "صندوق سرير خشبي",
    ],
    modifiers: [
      "فاخر",
      "عصري",
      "كلاسيك",
      "بسيط وأنيق",
      "بتصميم إيطالي",
      "بلمسة ذهبية",
    ],
  },
  {
    images: decorImages,
    key: "decor",
    room: "إضاءة وديكور",
    priceRange: [79, 599],
    types: [
      "لمبة أرضية",
      "لمبة مكتب",
      "ثريا معلقة",
      "مرآة دائرية",
      "مرآة أرضية",
      "لوحة ديكور",
      "شمعدان معدني",
    ],
    modifiers: [
      "ذهبية اللون",
      "بتصميم مودرن",
      "فاخرة",
      "بإطار خشبي",
      "بلمسة معدنية",
    ],
  },
  {
    images: desksImages,
    key: "desk",
    room: "مكتب",
    priceRange: [249, 899],
    types: ["مكتب عمل", "مكتب زاوية", "مكتب كمبيوتر", "مكتب كتابة"],
    modifiers: ["عصري", "بتصميم بسيط", "بأدراج جانبية", "فاخر بمساحة تخزين"],
  },
  {
    images: chairsImages,
    key: "chair",
    room: "غرفة سفرة",
    priceRange: [99, 449],
    types: ["كرسي طعام", "كرسي مكتب", "كرسي بذراعين", "كرسي هزاز"],
    modifiers: ["جلد طبيعي", "قماش مبطن", "خشبي كلاسيك", "بتصميم عصري"],
  },
  {
    images: livingroomImages,
    key: "livingroom",
    room: "صالون",
    priceRange: [149, 799],
    types: [
      "طاولة قهوة",
      "طاولة تلفزيون",
      "رف كتب مفتوح",
      "وحدة تلفزيون",
      "طاولة جانبية",
    ],
    modifiers: ["زجاجية", "خشبية", "بتصميم مينيمال", "فاخرة"],
  },
  {
    images: tablesImages,
    key: "table",
    room: "غرفة سفرة",
    priceRange: [349, 1299],
    types: ["طاولة طعام مستطيلة", "طاولة طعام دائرية", "طاولة بار"],
    modifiers: ["خشب بلوط", "بتصميم عصري", "فاخرة لـ 6 أشخاص"],
  },
  {
    images: [...sofaImages, ...kanabImages],
    key: "sofa",
    room: "صالون",
    priceRange: [699, 2299],
    types: [
      "كنبة قماش",
      "كنبة جلد",
      "كنبة زاوية",
      "كنبة ثنائية",
      "كنبة ثلاثية",
    ],
    modifiers: [
      "رمادية مودرن",
      "بنية كلاسيك",
      "بيج فاخرة",
      "زاوية كبيرة مريحة",
    ],
  },
];

const buildProducts = (config) =>
  config.images.map((thumbnail, index) => {
    const type = pick(config.types, index);
    const modifier = pick(
      config.modifiers,
      Math.floor(index / config.types.length),
    );

    return {
      id: `${config.key}-${index + 1}`,
      title: `${type} ${modifier}`,
      description: `${type} ${modifier} مصنوع من ${pick(woodTypes, index)} بجودة عالية، ${pick(finishes, index + 1)}، مثالي لإضافة لمسة من الفخامة إلى ${config.room}.`,
      room: config.room,
      category: config.key,
      brand: "أوريليان",
      wood_type: pick(woodTypes, index),
      finish: pick(finishes, index + 1),
      price: randomPrice(config.priceRange[0], config.priceRange[1]),
      discountPercentage: randomDiscount(),
      thumbnail,
    };
  });

const furnitureProducts = sectionsConfig.flatMap(buildProducts);

export const roomsList = [
  "الكل",
  "صالون",
  "غرفة نوم",
  "غرفة سفرة",
  "مكتب",
  "إضاءة وديكور",
];

export default furnitureProducts;
