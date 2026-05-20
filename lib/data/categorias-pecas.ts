export type Subcategoria = {
  slug: string;
  nome: string;
};

export type CategoriaPecas = {
  slug: string;
  nome: string;
  subcategorias: Subcategoria[];
};

export const categoriasPecas: CategoriaPecas[] = [
  {
    slug: 'motor',
    nome: 'Motor',
    subcategorias: [
      { slug: 'cilindros', nome: 'Cilindros' },
      { slug: 'cabecotes', nome: 'Cabeçotes' },
      { slug: 'pistoes', nome: 'Pistões' },
      { slug: 'embreagem', nome: 'Embreagem' },
      { slug: 'bielas', nome: 'Bielas' },
      { slug: 'virabrequim', nome: 'Virabrequim' },
      { slug: 'rolamentos', nome: 'Rolamentos' },
      { slug: 'valvulas', nome: 'Válvulas' },
      { slug: 'guias', nome: 'Guias' },
      { slug: 'tensores', nome: 'Tensores' },
      { slug: 'acionadores', nome: 'Acionadores' },
      { slug: 'balancins', nome: 'Balancins' },
      { slug: 'arvore-de-comando', nome: 'Árvore de Comando' },
      { slug: 'bomba-de-oleo', nome: 'Bomba de Óleo' },
      { slug: 'corrente-de-comando', nome: 'Corrente de Comando' },
    ],
  },
  {
    slug: 'transmissao',
    nome: 'Transmissão',
    subcategorias: [
      { slug: 'kit-tracao', nome: 'Kit Tração' },
      { slug: 'correntes', nome: 'Correntes' },
      { slug: 'correias', nome: 'Correias' },
      { slug: 'kit-coroa-pinhao', nome: 'Kit Coroa + Pinhão' },
    ],
  },
  {
    slug: 'sistema-de-freios',
    nome: 'Sistema de Freios',
    subcategorias: [
      { slug: 'pastilhas', nome: 'Pastilhas' },
      { slug: 'patins', nome: 'Patins' },
      { slug: 'pincas', nome: 'Pinças' },
      { slug: 'cubos', nome: 'Cubos' },
      { slug: 'cilindro-mestre-superior', nome: 'Cilindro Mestre Superior' },
    ],
  },
  {
    slug: 'direcao',
    nome: 'Direção',
    subcategorias: [
      { slug: 'guidao', nome: 'Guidão' },
      { slug: 'mesa-inferior', nome: 'Mesa Inferior' },
      { slug: 'mesa-superior', nome: 'Mesa Superior' },
      { slug: 'caixa-de-direcao', nome: 'Caixa de Direção' },
    ],
  },
  {
    slug: 'suspensao',
    nome: 'Suspensão',
    subcategorias: [
      { slug: 'bengalas', nome: 'Bengalas' },
      { slug: 'amortecedores', nome: 'Amortecedores' },
    ],
  },
  {
    slug: 'eletrica',
    nome: 'Elétrica',
    subcategorias: [
      { slug: 'fiacoes', nome: 'Fiações' },
      { slug: 'baterias', nome: 'Baterias' },
      { slug: 'sensores', nome: 'Sensores' },
      { slug: 'estatores', nome: 'Estatores' },
      { slug: 'retificadores', nome: 'Retificadores' },
      { slug: 'fusiveis', nome: 'Fusíveis' },
    ],
  },
  {
    slug: 'iluminacao',
    nome: 'Iluminação',
    subcategorias: [
      { slug: 'lampadas', nome: 'Lâmpadas' },
      { slug: 'setas', nome: 'Setas' },
      { slug: 'lanternas-traseiras', nome: 'Lanternas Traseiras' },
      { slug: 'interruptores-de-freio', nome: 'Interruptores de Freio' },
    ],
  },
  {
    slug: 'ignicao',
    nome: 'Ignição',
    subcategorias: [
      { slug: 'velas', nome: 'Velas' },
      { slug: 'bobinas', nome: 'Bobinas' },
      { slug: 'cdi', nome: 'CDI' },
    ],
  },
  {
    slug: 'injecao-eletronica',
    nome: 'Injeção Eletrônica',
    subcategorias: [
      { slug: 'bicos-injetores', nome: 'Bicos Injetores' },
      { slug: 'tbi', nome: 'TBI' },
      { slug: 'ecu-pgm', nome: 'ECU / PGM' },
      { slug: 'bomba-combustivel', nome: 'Bomba de Combustível' },
      { slug: 'tps', nome: 'TPS' },
      { slug: 'sensor-temperatura', nome: 'Sensor de Temperatura' },
      { slug: 'sensor-map', nome: 'Sensor MAP' },
      { slug: 'sonda-lambda', nome: 'Sonda Lambda' },
    ],
  },
  {
    slug: 'carburador',
    nome: 'Carburador',
    subcategorias: [],
  },
  {
    slug: 'escapamento',
    nome: 'Escapamento',
    subcategorias: [
      { slug: 'coletor', nome: 'Coletor' },
      { slug: 'catalisador', nome: 'Catalisador' },
      { slug: 'curva-do-escape', nome: 'Curva do Escape' },
      { slug: 'escape', nome: 'Escape' },
    ],
  },
  {
    slug: 'rodas',
    nome: 'Rodas',
    subcategorias: [
      { slug: 'aro', nome: 'Aro' },
      { slug: 'cubos-roda', nome: 'Cubos' },
      { slug: 'raios', nome: 'Raios' },
      { slug: 'espelhos-de-freio', nome: 'Espelhos de Freio' },
      { slug: 'flange', nome: 'Flange' },
      { slug: 'rolamentos-roda', nome: 'Rolamentos' },
    ],
  },
  {
    slug: 'carenagens',
    nome: 'Carenagens',
    subcategorias: [
      { slug: 'carenagem-do-farol', nome: 'Carenagem do Farol' },
      { slug: 'carenagem-do-tanque', nome: 'Carenagem do Tanque' },
      { slug: 'tampas-laterais', nome: 'Tampas Laterais' },
      { slug: 'rabetas', nome: 'Rabetas' },
      { slug: 'retrovisores', nome: 'Retrovisores' },
    ],
  },
  {
    slug: 'cabos-de-comando',
    nome: 'Cabos de Comando',
    subcategorias: [
      { slug: 'cabo-acelerador', nome: 'Cabo Acelerador' },
      { slug: 'cabo-freio', nome: 'Cabo Freio' },
      { slug: 'cabo-embreagem', nome: 'Cabo Embreagem' },
      { slug: 'cabo-velocimetro', nome: 'Cabo Velocímetro' },
    ],
  },
  {
    slug: 'acessorios-moto',
    nome: 'Acessórios',
    subcategorias: [
      { slug: 'protetores-de-carenagem', nome: 'Protetores de Carenagem' },
      { slug: 'alcas', nome: 'Alças' },
      { slug: 'bagageiros', nome: 'Bagageiros' },
      { slug: 'suportes-de-bau', nome: 'Suportes de Baú' },
      { slug: 'baus', nome: 'Baús' },
      { slug: 'protetores-de-mao', nome: 'Protetores de Mão' },
      { slug: 'manetes', nome: 'Manetes' },
      { slug: 'manoplas', nome: 'Manoplas' },
      { slug: 'suportes-de-placa', nome: 'Suportes de Placa' },
      { slug: 'redes-de-capacete', nome: 'Redes de Capacete' },
    ],
  },
];
