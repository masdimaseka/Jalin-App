import { DataItemPenjahit, PENJAHIT_DATA } from "./DataPenjahitDummy";
import { DataItemUser, USER_DATA } from "./DataUserDummy";

export type DataItemPekerjaan = {
  idTransaksi: string;
  dataUser: DataItemUser;
  dataPenjahit: DataItemPenjahit;
  judulPekerjaan: string;
  deskripsiPekerjaan: string;
  lokasiPengerjaan: string;
  deadlinePengerjaan: string;
  statusPekerjaan: "pending" | "proses" | "selesai";
};

export const PEKERJAAN_DATA: DataItemPekerjaan[] = [
  {
    idTransaksi: "TRX001",
    dataUser: USER_DATA[0],
    dataPenjahit: PENJAHIT_DATA[0],
    judulPekerjaan: "Jahit Jas Pernikahan",
    deskripsiPekerjaan:
      "Jas formal untuk acara pernikahan. Model slim fit warna navy.",
    lokasiPengerjaan: "Jl. Tukad Yeh Aya No. 18, Denpasar",
    deadlinePengerjaan: "2025-04-30",
    statusPekerjaan: "proses",
  },
  {
    idTransaksi: "TRX002",
    dataUser: USER_DATA[1],
    dataPenjahit: PENJAHIT_DATA[1],
    judulPekerjaan: "Gaun Pesta Elegan",
    deskripsiPekerjaan:
      "Gaun panjang dengan aksen glitter untuk acara pesta malam.",
    lokasiPengerjaan: "Jl. Diponegoro No. 25, Denpasar",
    deadlinePengerjaan: "2025-05-10",
    statusPekerjaan: "pending",
  },
  {
    idTransaksi: "TRX003",
    dataUser: USER_DATA[2],
    dataPenjahit: PENJAHIT_DATA[2],
    judulPekerjaan: "Kemeja Kantor",
    deskripsiPekerjaan: "Kemeja putih lengan panjang, slim fit.",
    lokasiPengerjaan: "Jl. Gatot Subroto Timur No. 99, Denpasar",
    deadlinePengerjaan: "2025-04-15",
    statusPekerjaan: "selesai",
  },
  {
    idTransaksi: "TRX004",
    dataUser: USER_DATA[0],
    dataPenjahit: PENJAHIT_DATA[3],
    judulPekerjaan: "Seragam Sekolah",
    deskripsiPekerjaan: "3 set seragam lengkap untuk anak SD.",
    lokasiPengerjaan: "Jl. Merdeka No. 10, Denpasar",
    deadlinePengerjaan: "2025-04-20",
    statusPekerjaan: "proses",
  },
  {
    idTransaksi: "TRX005",
    dataUser: USER_DATA[1],
    dataPenjahit: PENJAHIT_DATA[4],
    judulPekerjaan: "Jaket Hoodie",
    deskripsiPekerjaan: "Jaket hoodie bahan fleece untuk musim dingin.",
    lokasiPengerjaan: "Jl. Teuku Umar No. 5, Denpasar",
    deadlinePengerjaan: "2025-05-01",
    statusPekerjaan: "pending",
  },
  {
    idTransaksi: "TRX006",
    dataUser: USER_DATA[2],
    dataPenjahit: PENJAHIT_DATA[0],
    judulPekerjaan: "Dress Casual",
    deskripsiPekerjaan: "Dress santai untuk jalan-jalan, warna pastel.",
    lokasiPengerjaan: "Jl. Pulau Kawe No. 17, Denpasar",
    deadlinePengerjaan: "2025-04-25",
    statusPekerjaan: "proses",
  },
  {
    idTransaksi: "TRX007",
    dataUser: USER_DATA[3],
    dataPenjahit: PENJAHIT_DATA[1],
    judulPekerjaan: "Celana Chino",
    deskripsiPekerjaan: "Celana bahan chino slim fit warna khaki.",
    lokasiPengerjaan: "Jl. Hayam Wuruk No. 45, Denpasar",
    deadlinePengerjaan: "2025-04-18",
    statusPekerjaan: "selesai",
  },
  {
    idTransaksi: "TRX008",
    dataUser: USER_DATA[4],
    dataPenjahit: PENJAHIT_DATA[2],
    judulPekerjaan: "Kebaya Tradisional",
    deskripsiPekerjaan: "Kebaya untuk acara adat dengan bordir halus.",
    lokasiPengerjaan: "Jl. WR Supratman No. 12, Denpasar",
    deadlinePengerjaan: "2025-05-05",
    statusPekerjaan: "pending",
  },
  {
    idTransaksi: "TRX009",
    dataUser: USER_DATA[1],
    dataPenjahit: PENJAHIT_DATA[3],
    judulPekerjaan: "Baju Bayi",
    deskripsiPekerjaan: "5 set pakaian bayi dari bahan katun lembut.",
    lokasiPengerjaan: "Jl. Raya Sesetan No. 88, Denpasar",
    deadlinePengerjaan: "2025-04-22",
    statusPekerjaan: "proses",
  },
  {
    idTransaksi: "TRX010",
    dataUser: USER_DATA[0],
    dataPenjahit: PENJAHIT_DATA[4],
    judulPekerjaan: "Rok Span",
    deskripsiPekerjaan: "Rok formal untuk ke kantor, warna hitam.",
    lokasiPengerjaan: "Jl. Imam Bonjol No. 30, Denpasar",
    deadlinePengerjaan: "2025-04-28",
    statusPekerjaan: "selesai",
  },
];
