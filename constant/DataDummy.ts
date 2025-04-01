export type DataItem = {
  id: string;
  name: string;
  location: string;
  experience: string;
  rating: number;
  specialties: string[];
  paymentRate: string;
};

export const PENJAHIT_DATA: DataItem[] = [
  {
    id: "1",
    name: "Budi Tailor",
    location: "Jakarta",
    experience: "10 Tahun",
    rating: 4.8,
    specialties: ["Jas", "Kebaya", "Setelan Formal"],
    paymentRate: "100rb-150rb",
  },
  {
    id: "2",
    name: "Siti Mode",
    location: "Bandung",
    experience: "8 Tahun",
    rating: 4.6,
    specialties: ["Batik", "Gamis", "Baju Muslim"],
    paymentRate: "80rb-120rb",
  },
  {
    id: "3",
    name: "Dedi Custom",
    location: "Surabaya",
    experience: "12 Tahun",
    rating: 4.9,
    specialties: ["Jaket Kulit", "Jeans", "Denim"],
    paymentRate: "200rb-300rb",
  },
  {
    id: "4",
    name: "Rina Fashion",
    location: "Yogyakarta",
    experience: "6 Tahun",
    rating: 4.5,
    specialties: ["Gaun", "Dress", "Pakaian Anak"],
    paymentRate: "150rb-250rb",
  },
  {
    id: "5",
    name: "Agus Tailor",
    location: "Semarang",
    experience: "15 Tahun",
    rating: 5.0,
    specialties: ["Setelan Kantor", "Kemeja", "Celana Formal"],
    paymentRate: "120rb-200rb",
  },
];
