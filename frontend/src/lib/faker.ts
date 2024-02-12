const PEOPLES = [
  ...['Goku', 'Luffy', 'Naruto', 'Ichigo Kurosaki', 'Light Yagami'],
  ...['Vegeta', 'Edward Elric', 'Saitama', 'Sasuke', 'Zoro', 'Gon'],
  ...['Eren Yeager', 'Levi Ackerman', 'All Might', 'Lelouch Lamperouge', 'Spike Spiegel'],
  ...['Gintoki Sakata', 'Kakashi', 'Roy Mustang', 'L', 'Gohan'],
  ...['Vegeta', 'Yusuke', 'Kenshin Himura'],
];

const CITIES = [
  ...['Tóquio', 'Nova Iorque', 'São Paulo', 'Cidade do México', 'Delhi'],
  ...['Xangai', 'Mumbai', 'Pequim', 'Osaka', 'Daca', 'Cairo'],
  ...['Lagos', 'Istambul', 'Rio de Janeiro', 'Los Angeles', 'Calcutá', 'Moscou'],
  ...['Karachi', 'Paris', 'Londres', 'Lima', 'Banguecoque', 'Seul'],
  ...['Bogotá', 'Chennai'],
];

const BOOKS = [
  ...[
    'Cem Anos de Solidão',
    'O Senhor dos Anéis',
    'Harry Potter e a Pedra Filosofal',
    '1984',
    'Dom Quixote',
  ],
  ...[
    'Orgulho e Preconceito',
    'O Pequeno Príncipe',
    'O Sol é para Todos',
    'O Alquimista',
    'O Apanhador no Campo de Centeio',
  ],
  ...[
    'Crime e Castigo',
    'A Metamorfose',
    'Moby Dick',
    'As Aventuras de Tom Sawyer',
    'O Grande Gatsby',
  ],
  ...[
    'Anna Karenina',
    'Os Miseráveis',
    'Memórias Póstumas de Brás Cubas',
    'O Retrato de Dorian Gray',
    'A Guerra dos Tronos',
  ],
  ...[
    'Harry Potter e as Relíquias da Morte',
    'O Hobbit',
    'O Código Da Vinci',
    'A Cabana',
    'A Menina que Roubava Livros',
  ],
];

const random = (arr: unknown[]) => arr[Math.floor(Math.random() * arr.length)];
const id = () => Math.floor(Math.random() * 1000).toString(32);

export const team = () => ({
  id: id(),
  name: random(CITIES),
  owner: random([true, false]),
  members: Array.from({ length: 1 + Math.floor(Math.random() * 10) }).map(() => ({
    id: id(),
    name: random(PEOPLES),
  })),
});
