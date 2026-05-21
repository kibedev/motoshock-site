export type ProdutoAcessorio = {
  id: string;
  nome: string;
  descricao?: string;
  logo?: string;
  brandColor?: string;
  country?: string;
};

export type MarcaAcessorio = {
  slug: string;
  nome: string;
  logo?: string;
  descricao?: string;
  brandColor?: string;
  produtos: ProdutoAcessorio[];
};

export type TipoAcessorio = {
  slug: string;
  nome: string;
  descricao: string;
  marcas: MarcaAcessorio[];
};

export const tiposAcessorio: TipoAcessorio[] = [
  {
    slug: 'capacetes',
    nome: 'Capacetes',
    descricao: 'Capacetes das melhores marcas para máxima proteção',
    marcas: [
      { slug: 'asx',       nome: 'ASX',       logo: '/imagens/capacetes-png/asx-capacete.png',       descricao: 'Helmets',        brandColor: '#E0202C', produtos: [] },
      { slug: 'norisk',    nome: 'Norisk',    logo: '/imagens/capacetes-png/norisk-capacete.png',    descricao: 'Premium',        brandColor: '#9BCC1F', produtos: [] },
      { slug: 'ls2',       nome: 'LS2',       logo: '/imagens/capacetes-png/ls2-capacete.png',       descricao: 'Helmets',        brandColor: '#E10F1E', produtos: [] },
      { slug: 'ebf',       nome: 'EBF',       logo: '/imagens/capacetes-png/ebf-capacete.png',       descricao: 'Helmets',        brandColor: '#FF6B1A', produtos: [] },
      { slug: 'taurus',    nome: 'Taurus',    logo: '/imagens/capacetes-png/taurus-capacete.png',    descricao: 'Iron Made',      brandColor: '#C9A24A', produtos: [] },
      { slug: 'helt',      nome: 'Helt',      logo: '/imagens/capacetes-png/helt-capacete.png',      descricao: 'Sport Riders',   brandColor: '#D8232A', produtos: [] },
      { slug: 'x11',       nome: 'X11',       logo: '/imagens/capacetes-png/x11-capacete.png',       descricao: 'Safety Riders',  brandColor: '#F26B1D', produtos: [] },
      { slug: 'race-tech', nome: 'Race Tech', logo: '/imagens/capacetes-png/race-tech-capacete.png', descricao: 'Performance',    brandColor: '#E12230', produtos: [] },
    ],
  },
  {
    slug: 'capas-de-chuva',
    nome: 'Capas de Chuva',
    descricao: 'Proteção contra chuva para motociclistas e motoboys',
    marcas: [
      { slug: 'alba',       nome: 'Alba',       logo: '/imagens/capas-png/alba-capa.png',       descricao: 'Capa & Cobertura',  brandColor: '#EE5A1A', produtos: [] },
      { slug: 'delta',      nome: 'Delta',      logo: '/imagens/capas-png/delta-capa.png',      descricao: 'Rain Gear',         brandColor: '#D92D2D', produtos: [] },
      { slug: 'pantaneiro', nome: 'Pantaneiro', logo: '/imagens/capas-png/pantaneiro-capa.png', descricao: 'Resistente',        brandColor: '#2BAE4C', produtos: [] },
      { slug: 'pioneiro',   nome: 'Pioneiro',   logo: '/imagens/capas-png/pioneira-capa.png',   descricao: 'Proteção · Vencer', brandColor: '#D94518', produtos: [] },
    ],
  },
  {
    slug: 'jaquetas',
    nome: 'Jaquetas',
    descricao: 'Jaquetas para motociclistas com proteção e conforto',
    marcas: [
      { slug: 'x11', nome: 'X11', logo: '/imagens/acessorios-png/jaqueta-x11.png', produtos: [] },
    ],
  },
  {
    slug: 'calcas',
    nome: 'Calças',
    descricao: 'Calças com proteção para motociclistas',
    marcas: [
      { slug: 'x11', nome: 'X11', logo: '/imagens/acessorios-png/calça-x11.png', produtos: [] },
    ],
  },
  {
    slug: 'luvas',
    nome: 'Luvas',
    descricao: 'Luvas para máxima proteção e conforto nas mãos',
    marcas: [
      { slug: 'x11', nome: 'X11', logo: '/imagens/acessorios-png/luva-x11.png', produtos: [] },
    ],
  },
  {
    slug: 'botas',
    nome: 'Botas',
    descricao: 'Botas para motociclistas com segurança e conforto',
    marcas: [
      { slug: 'pantaneiro', nome: 'Pantaneiro', logo: '/imagens/acessorios-png/bota-pantaneiro.png', produtos: [] },
    ],
  },
  {
    slug: 'oleos',
    nome: 'Óleos',
    descricao: 'Óleos para motor, freio e suspensão das melhores marcas',
    marcas: [
      {
        slug: 'oleo-motor',
        nome: 'Óleo de Motor',
        descricao: 'Lubrificação · Performance',
        brandColor: '#F5A524',
        produtos: [
          { id: 'om-motul',    nome: 'Motul',    logo: '/imagens/oleos-png/motul-oleo.png',    brandColor: '#E0202C', country: 'FR' },
          { id: 'om-mobil',    nome: 'Mobil',    logo: '/imagens/oleos-png/mobil-oleo.png',    brandColor: '#1968D0', country: 'US' },
          { id: 'om-lubrax',   nome: 'Lubrax',   logo: '/imagens/oleos-png/lubrax-oleo.png',   brandColor: '#F1D300', country: 'BR' },
          { id: 'om-ipiranga', nome: 'Ipiranga', logo: '/imagens/oleos-png/ipiranga-oleo.png', brandColor: '#1452A1', country: 'BR' },
          { id: 'om-shell',    nome: 'Shell',    logo: '/imagens/oleos-png/shell-oleo.png',    brandColor: '#F5B017', country: 'NL' },
          { id: 'om-yamalube', nome: 'Yamalube', logo: '/imagens/oleos-png/yamalube-oleo.png', brandColor: '#1B3FA0', country: 'JP' },
        ],
      },
      {
        slug: 'oleo-freio',
        nome: 'Óleo de Freio',
        descricao: 'Fluido DOT · Segurança',
        brandColor: '#E10F1E',
        produtos: [
          { id: 'of-motul',    nome: 'Motul',    logo: '/imagens/oleos-png/motul-dot5.png',       brandColor: '#E0202C' },
          { id: 'of-bosch',    nome: 'Bosch',    logo: '/imagens/oleos-png/bosch-dot4.png',       brandColor: '#E10F1E' },
          { id: 'of-yamalube', nome: 'Yamalube', logo: '/imagens/logos-oleo/yamalube-logo.png',   brandColor: '#1B3FA0' },
        ],
      },
      {
        slug: 'oleo-suspensao',
        nome: 'Óleo de Suspensão',
        descricao: 'Bengala · Amortecimento',
        brandColor: '#22B2D6',
        produtos: [
          { id: 'os-motul', nome: 'Motul', logo: '/imagens/oleos-png/fork-oil.png', brandColor: '#E0202C' },
        ],
      },
    ],
  },
];
