
import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Dasar Hidroponik 2024',
    description: 'Panduan lengkap memulai hidroponik dari nol untuk pemula.',
    content: 'Hidroponik adalah solusi pertanian masa depan. Tanpa menggunakan tanah, kita bisa mengontrol nutrisi secara presisi. Modul ini membahas persiapan alat, pemilihan lokasi, dan pemahaman siklus hidup tanaman dalam sistem air.',
    category: 'Dasar',
    duration: '12 Menit',
    icon: 'Leaf',
    videoUrl: 'https://www.youtube.com/watch?v=XT9fmv79h2Y',
    quiz: [
      {
        id: 101,
        question: "Apa keunggulan utama hidroponik dibanding pertanian konvensional?",
        options: ["Menggunakan lebih banyak tanah", "Kontrol nutrisi yang presisi", "Hanya bisa di luar ruangan", "Membutuhkan lebih banyak pestisida"],
        correct: 1
      },
      {
        id: 102,
        question: "Apa media yang mutlak tidak digunakan dalam hidroponik?",
        options: ["Air", "Rockwool", "Tanah Lempung", "Cocopeat"],
        correct: 2
      }
    ]
  },
  {
    id: '2',
    title: 'Sistem NFT (Nutrient Film Technique)',
    description: 'Cara kerja sistem NFT yang efisien dan hemat air.',
    content: 'Nutrient Film Technique (NFT) adalah sistem di mana lapisan tipis air nutrisi mengalir terus menerus. Ini memastikan akar mendapatkan oksigen dan nutrisi secara seimbang. Sangat cocok untuk sayuran daun seperti selada dan bayam.',
    category: 'Sistem',
    duration: '18 Menit',
    icon: 'Droplets',
    videoUrl: 'https://www.youtube.com/watch?v=XT9fmv79h2Y',
    quiz: [
      {
        id: 201,
        question: "Bagaimana karakteristik aliran air dalam sistem NFT?",
        options: ["Menggenang dalam", "Lapisan tipis mengalir", "Sistem tetes berkala", "Kabut udara"],
        correct: 1
      },
      {
        id: 202,
        question: "Jenis tanaman apa yang paling cocok untuk sistem NFT?",
        options: ["Tanaman Umbi", "Sayuran Daun", "Pohon Besar", "Kaktus"],
        correct: 1
      }
    ]
  },
  {
    id: '3',
    title: 'Smart Irrigation & IoT',
    description: 'Menggunakan teknologi sensor untuk pengairan otomatis.',
    content: 'Pelajari bagaimana sensor kelembaban dan pH bekerja sama dengan mikrokontroler untuk memberikan air hanya saat tanaman membutuhkan. Ini adalah inti dari pertanian 4.0 yang efisien.',
    category: 'Teknologi',
    duration: '25 Menit',
    icon: 'Cpu',
    videoUrl: 'https://www.youtube.com/watch?v=XT9fmv79h2Y',
    quiz: [
      {
        id: 301,
        question: "Apa peran utama sensor dalam Smart Irrigation?",
        options: ["Memberi warna pada air", "Mendeteksi kebutuhan tanaman", "Mematikan listrik rumah", "Mempercepat panen secara paksa"],
        correct: 1
      }
    ]
  },
  {
    id: '4',
    title: 'Manajemen Nutrisi AB Mix',
    description: 'Cara mencampur nutrisi agar tanaman tumbuh optimal.',
    content: 'Nutrisi adalah makanan utama tanaman hidroponik. Kita akan belajar cara melarutkan pekatan A dan B, serta cara mengukur kepekatan menggunakan TDS meter untuk setiap fase pertumbuhan.',
    category: 'Nutrisi',
    duration: '20 Menit',
    icon: 'Zap',
    videoUrl: 'https://www.youtube.com/watch?v=XT9fmv79h2Y',
    quiz: [
      {
        id: 401,
        question: "Alat apa yang digunakan untuk mengukur kepekatan nutrisi?",
        options: ["PH Meter", "TDS Meter", "Termometer", "Barometer"],
        correct: 1
      }
    ]
  }
];

export const HYDRO_QUOTES = [
  "Hidroponik: Solusi cerdas bertani di lahan terbatas.",
  "Nutrisi yang tepat adalah kunci pertumbuhan tanaman yang sehat.",
  "Tanpa tanah, tanpa kotor, hasil maksimal dengan hidroponik.",
  "Air yang mengalir membawa kehidupan bagi setiap helai daun.",
  "Smart irrigation: Memberi minum tanaman dengan presisi teknologi.",
  "Masa depan pangan ada di tangan mereka yang berinovasi dengan air.",
  "PH seimbang, tanaman pun senang.",
  "Hidroponik bukan hanya hobi, tapi gaya hidup berkelanjutan.",
  "Satu tetes nutrisi sangat berharga bagi ekosistem hidroponikmu.",
  "Bertani modern: Lebih bersih, lebih cepat, lebih produktif."
];

export const CATEGORY_COLORS = {
  'Dasar': 'bg-emerald-100 text-emerald-700',
  'Sistem': 'bg-blue-100 text-blue-700',
  'Nutrisi': 'bg-amber-100 text-amber-700',
  'Teknologi': 'bg-purple-100 text-purple-700'
};
