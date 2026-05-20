type LinkWhatsAppOpts = {
  marca?: string;
  modelo?: string;
  categoria?: string;
  subcategoria?: string;
  produto?: string;
};

export function gerarLinkWhatsApp(
  numero: string,
  opts: LinkWhatsAppOpts = {}
): string {
  const { marca, modelo, categoria, subcategoria, produto } = opts;

  let mensagem = 'Olá! ';

  if (produto) {
    mensagem += `Tenho interesse em *${produto}*`;
  } else if (subcategoria) {
    mensagem += `Tenho interesse em peças de *${subcategoria}*`;
  } else if (categoria) {
    mensagem += `Tenho interesse em peças de *${categoria}*`;
  } else {
    mensagem += 'Tenho interesse em peças e acessórios';
  }

  if (modelo && marca) {
    mensagem += ` para minha *${marca} ${modelo}*`;
  } else if (marca) {
    mensagem += ` da marca *${marca}*`;
  }

  mensagem += '. Poderia me informar disponibilidade e valores? Obrigado!';

  const numeroLimpo = numero.replace(/\D/g, '');
  return `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
}
