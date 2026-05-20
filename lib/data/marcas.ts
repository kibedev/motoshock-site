export type Modelo = {
  slug: string;
  nome: string;
};

export type MarcaMoto = {
  slug: string;
  nome: string;
  disponivel: boolean;
  modelos: Modelo[];
};

export const marcas: MarcaMoto[] = [
  {
    slug: 'honda',
    nome: 'Honda',
    disponivel: true,
    modelos: [
      { slug: 'pop-100', nome: 'Pop 100' },
      { slug: 'pop-110', nome: 'Pop 110' },
      { slug: 'biz-100', nome: 'Biz 100' },
      { slug: 'biz-110', nome: 'Biz 110' },
      { slug: 'biz-125', nome: 'Biz 125' },
      { slug: 'pcx', nome: 'PCX' },
      { slug: 'adv', nome: 'ADV' },
      { slug: 'cg-titan-160', nome: 'CG Titan 160' },
      { slug: 'bros-160', nome: 'Bros 160' },
      { slug: 'cb300f', nome: 'CB300F' },
      { slug: 'sahara-300', nome: 'Sahara 300' },
      { slug: 'cb500f', nome: 'CB500F' },
      { slug: 'cb500r', nome: 'CB500R' },
    ],
  },
  {
    slug: 'yamaha',
    nome: 'Yamaha',
    disponivel: true,
    modelos: [
      { slug: 'ybr', nome: 'YBR' },
      { slug: 'factor', nome: 'Factor' },
      { slug: 'fazer-150', nome: 'Fazer 150' },
      { slug: 'crosser-150', nome: 'Crosser 150' },
      { slug: 'fazer-250', nome: 'Fazer 250' },
      { slug: 'lander-250', nome: 'Lander 250' },
      { slug: 'mt-03', nome: 'MT-03' },
      { slug: 'mt-07', nome: 'MT-07' },
      { slug: 'mt-09', nome: 'MT-09' },
      { slug: 'nmax', nome: 'NMAX' },
    ],
  },
  {
    slug: 'royal-enfield',
    nome: 'Royal Enfield',
    disponivel: true,
    modelos: [
      { slug: 'hunter', nome: 'Hunter' },
      { slug: 'himalayan', nome: 'Himalayan' },
      { slug: 'meteor', nome: 'Meteor' },
    ],
  },
  {
    slug: 'bajaj',
    nome: 'Bajaj',
    disponivel: true,
    modelos: [
      { slug: 'dominar-250', nome: 'Dominar 250' },
      { slug: 'dominar-400', nome: 'Dominar 400' },
    ],
  },
  {
    slug: 'bmw',
    nome: 'BMW',
    disponivel: true,
    modelos: [
      { slug: 'gs310', nome: 'GS310' },
    ],
  },
  // Em breve — adicione modelos quando disponíveis
  { slug: 'suzuki', nome: 'Suzuki', disponivel: false, modelos: [] },
  { slug: 'kawasaki', nome: 'Kawasaki', disponivel: false, modelos: [] },
  { slug: 'triumph', nome: 'Triumph', disponivel: false, modelos: [] },
  { slug: 'dafra', nome: 'Dafra', disponivel: false, modelos: [] },
  { slug: 'shineray', nome: 'Shineray', disponivel: false, modelos: [] },
  { slug: 'haojue', nome: 'Haojue', disponivel: false, modelos: [] },
  { slug: 'ktm', nome: 'KTM', disponivel: false, modelos: [] },
];
