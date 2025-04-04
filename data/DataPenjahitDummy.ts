export type DataItemPenjahit = {
  idPenjahit: string;
  namaPenjahit: string;
  lokasiPenjahit: string;
  pengalamanPenjahit: string;
  ratingPenjahit: number;
  spesialisasiPenjahit: string[];
  tarifJahit: string;
  deskripsiPenjahit: string;
};

export const PENJAHIT_DATA: DataItemPenjahit[] = [
  {
    idPenjahit: "PNJ001",
    namaPenjahit: "Budi Tailor",
    lokasiPenjahit: "Jl. Tukad Badung No. 128, Denpasar, Bali",
    pengalamanPenjahit: "10 Tahun",
    ratingPenjahit: 4.8,
    spesialisasiPenjahit: [
      "Jas",
      "Kebaya",
      "Setelan Formal",
      "Profesional",
      "Custom",
    ],
    tarifJahit: "100rb-150rb",
    deskripsiPenjahit:
      "Budi Tailor adalah penjahit profesional dengan pengalaman lebih dari 10 tahun dalam menjahit pakaian formal dan custom.",
  },
  {
    idPenjahit: "PNJ002",
    namaPenjahit: "Sari Jahit",
    lokasiPenjahit: "Jl. Nangka Selatan No. 45, Denpasar, Bali",
    pengalamanPenjahit: "8 Tahun",
    ratingPenjahit: 4.6,
    spesialisasiPenjahit: ["Kebaya", "Gaun", "Baju Pesta", "Wanita", "Custom"],
    tarifJahit: "80rb-130rb",
    deskripsiPenjahit:
      "Sari Jahit dikenal sebagai spesialis dalam pembuatan kebaya dan gaun pesta wanita dengan desain elegan.",
  },
  {
    idPenjahit: "PNJ003",
    namaPenjahit: "Adi Garmen",
    lokasiPenjahit: "Jl. Teuku Umar Barat No. 18, Denpasar, Bali",
    pengalamanPenjahit: "5 Tahun",
    ratingPenjahit: 4.3,
    spesialisasiPenjahit: ["Seragam", "Kaos", "Produksi Massal", "Pria"],
    tarifJahit: "70rb-100rb",
    deskripsiPenjahit:
      "Adi Garmen adalah penjahit dan produsen kecil yang fokus pada pembuatan seragam dan pakaian dalam jumlah banyak.",
  },
  {
    idPenjahit: "PNJ004",
    namaPenjahit: "Mira Fashion",
    lokasiPenjahit: "Jl. Hayam Wuruk No. 56, Denpasar, Bali",
    pengalamanPenjahit: "7 Tahun",
    ratingPenjahit: 4.7,
    spesialisasiPenjahit: ["Gaun", "Dress", "Wanita", "Modern"],
    tarifJahit: "90rb-140rb",
    deskripsiPenjahit:
      "Mira Fashion menyediakan jasa jahit gaun wanita modern dan dress casual yang fashionable dan nyaman dipakai.",
  },
  {
    idPenjahit: "PNJ005",
    namaPenjahit: "Tailor Pak Komang",
    lokasiPenjahit: "Jl. Gunung Agung No. 21, Denpasar, Bali",
    pengalamanPenjahit: "12 Tahun",
    ratingPenjahit: 4.9,
    spesialisasiPenjahit: ["Jas", "Celana", "Rok", "Formal", "Custom"],
    tarifJahit: "110rb-160rb",
    deskripsiPenjahit:
      "Tailor Pak Komang adalah spesialis jas pria, celana kerja, dan pakaian formal dengan kualitas jahitan premium.",
  },
];
