import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})

export class BuscaComponent {
  public mensagem: string = "Nossos Produtos"
  public filtro: string = ""

  public lista: Produto[] = [
    {codigo:1, nome:"Gabinete Gamer Phoenix", 
      descricao:"O Gabinete Gamer Phoenix combina design sofisticado com alta performance. Possui painel frontal em malha "+
      "para ótimo fluxo de ar, iluminação LED azul para um visual moderno, e detalhes em cobre que adicionam um toque premium. "+
      "Suporta placas-mãe ATX, micro-ATX e mini-ITX, com espaço para GPUs grandes e gestão eficiente de cabos.", 
      valor: 249.90, quantidade: 35, 
      keywords: ["Gabinete Gamer", "LED", "RGB", "Sofisticado"]
    },
    {codigo:2, nome:"Monitor Gamer Curvo NeoVision, 23.6 Pol", 
      descricao:"O Monitor Gamer Curvo NeoVision oferece uma experiência visual envolvente e de alto desempenho. Com uma tela "+
      "curva de última geração, ele proporciona um campo de visão expandido, garantindo uma imersão completa em jogos e conteúdo "+
      "multimídia. Sua resolução ultra nítida permite ver cada detalhe com clareza, ideal para jogadores que exigem o máximo em "+
      "qualidade gráfica.",
      valor: 699.90, quantidade: 25, 
      keywords: ["Monitor Curvo", "Monitor Gamer", "Pol", "23.6 Polegada"]
    },
    {codigo:3, nome:"Teclado Mecânico Gamer Thunderstrike",
      descricao:"O Teclado Mecânico Gamer Thunderstrike combina design futurista e desempenho de ponta, proporcionando uma "+
      "experiência de jogo precisa e responsiva. Com teclas mecânicas de alta durabilidade e retroiluminação LED personalizável, "+
      "ele é perfeito para gamers que buscam velocidade e estilo em suas jogadas.",
      valor: 149.90, quantidade: 10, 
      keywords: ["Teclado Gamer", "Teclado Mecânico", "Teclado Mecanico", "LED", "RGB"]
    },
    {codigo:4, nome:"Mouse Gamer RGB de Alta Precisão", 
      descricao:" Eleve seu desempenho nos jogos com o Mouse Gamer RGB de alta precisão. Com um design moderno e ergonômico, ele "+ 
      "oferece conforto máximo para longas sessões de uso. O acabamento em tom metálico azul brilhante e iluminação RGB personalizável "+
      "garantem um visual arrojado que vai chamar atenção no setup.",
      valor: 120.90, quantidade: 20, 
      keywords: ["Mouse Gamer", "Ergônomico", "Ergonomico", "Alta Precisão", "Alta Prcisao", "LED", "RGB"]
    },
    {codigo:5, nome:"Memória RAM RGB DDR4 de Alta Performance 16GB", 
      descricao:"A memória RAM RGB de alta performance combina estilo e potência, oferecendo alta velocidade e estabilidade para "+
      "gamers e criadores de conteúdo. Com design futurista e iluminação RGB personalizável, ela conta com dissipador de calor "+
      "avançado para manter a performance ideal. Compatível com as mais recentes plataformas, é a escolha perfeita para quem quer "+ 
      "melhorar o desempenho e o visual do PC.",
      valor: 299.90, quantidade: 45, 
      keywords: ["Memória Ram", "Memoria Ram", "16GB", "DDR4", "Alta Performace", "LED", "RGB"]
    },
    {codigo:6, nome:"Placa-mãe de Alta Performance com Suporte Avançado", 
      descricao:"Esta placa-mãe de alta performance é ideal para usuários exigentes, oferecendo compatibilidade com processadores "+
      "de última geração e suporte para memória de alta capacidade. Com múltiplos slots de expansão, ela permite configurações "+
      "robustas para gamers e profissionais. O design moderno, com detalhes metálicos e iluminação sutil, combina estilo e "+
      "funcionalidade. Além disso, conta com um sistema de refrigeração eficiente, garantindo estabilidade e operação segura, "+ 
      "mesmo em situações de uso intenso.",
      valor: 819.99, quantidade: 55, 
      keywords : ["Placa Mãe", "Placa Mae", "Placa-Mãe", "Placa-Mae","Alta Performace"]  
    },
    {codigo:7, nome:"Placa de Vídeo de Alta Performance",
      descricao:"Esta placa de vídeo de alto desempenho, com um design moderno e robusto, predominantemente prateada com detalhes em "+
      "preto. A placa apresenta um dissipador de calor em alumínio e uma grande ventoinha para resfriamento eficiente, além de "+
      "detalhes em LED que acentuam a estética futurista. Com conectores múltiplos para exibição de vídeo, como HDMI e DisplayPort, "+
      "a placa oferece alta compatibilidade com monitores e dispositivos avançados. Ideal para gamers exigentes e profissionais que "+
      "necessitam de desempenho gráfico de ponta.",
      valor: 1399.90, quantidade: 50, 
      keywords: ["Placa de Vídeo","Placa de Video", "Alta Performace", "Alto Desempenho", "LED", "RGB"]
    },
    {codigo:8, nome:"Fonte de Alimentação ATX 750W de Alta Eficiência",
      descricao:"Esta fonte de alimentação oferece uma performance estável e confiável para alimentar seu sistema com segurança. "+
      "Com um design robusto e uma ventoinha de alta capacidade, ela garante um resfriamento eficiente, ideal para configurações que"+
      "demandam energia consistente e estável. Seus cabos reforçados proporcionam um fácil gerenciamento dentro do gabinete, "+
      "oferecendo praticidade e organização.",
      valor: 519.90, quantidade: 40,
      keywords: ["Fonte de Alimentação", "Fonte de Alimentaçao", "Fonte de Alimentacão", "Fonte de Alimentacao","ATX", "750W", "Alta Eficiência", "Alta Eficiencia"]
    },
    {codigo:9, nome:"Gabinete Gamer Nexus Orion",
      descricao:"O Gabinete Gamer Nexus Orion foi desenvolvido para proporcionar o equilíbrio perfeito entre estética e funcionalidade. "+
      "Seu painel frontal conta com iluminação LED vermelha, trazendo um visual agressivo e futurista. A lateral em vidro temperado "+
      "permite exibir o interior do setup, destacando cada detalhe da sua construção. Com excelente fluxo de ar e espaço interno "+
      "otimizado, ele suporta placas-mãe ATX, micro-ATX e mini-ITX, além de oferecer compatibilidade com placas de vídeo de grande "+
      "porte e uma eficiente gestão de cabos.",
      valor: 279.00, quantidade: 30, 
      keywords: ["Gabinete Gamer", "LED", "RGB"]
    },
    {codigo:10, nome:"Processador AMD Ryzen 7 5700X 8-Core",
      descricao:"O AMD Ryzen 7 5700X é um processador de desktop de alto desempenho, projetado para oferecer uma experiência "+
      "superior em jogos e aplicações multitarefa. Com 8 núcleos e 16 threads, ele proporciona uma capacidade de processamento "+
      "robusta, ideal para tarefas que exigem alta eficiência e velocidade. Este modelo é desbloqueado, permitindo overclocking "+
      "para maximizar o desempenho, tornando-o uma escolha popular entre entusiastas de tecnologia e gamers. O design elegante e "+
      "moderno do processador reflete a inovação e a qualidade da marca AMD, consolidando sua posição no mercado de hardware avançado.",
      valor: 1128.40, quantidade: 87, 
      keywords: ["Processador AMD RYZEN 7 5700X 8-Core", "Alto Desempenho", "Alta Performace"] 
    },
    {codigo:11, nome:"Teclado Mecânico Titan-X",
      descricao:"Este teclado mecânico RGB de alto desempenho combina estilo e funcionalidade para proporcionar uma experiência de "+
      "digitação e jogos de primeira linha. Com iluminação RGB totalmente personalizável, ele oferece um visual vibrante e imersivo, "+
      "ideal para gamers e profissionais que desejam personalizar o ambiente de trabalho. Possui uma estrutura metálica durável, com"+
      "acabamento premium. Sua conectividade é via Fio USB de alta qualidade para resposta rápida",
      valor: 120.90, quantidade: 10, 
      keywords: ["Teclado Mecânico", "Teclado Mecanico", "LED", "RGB"]
    },
    {codigo:12, nome:"Mouse Gamer Falcon-X RGB Precision",
      descricao:"Projetado para gamers exigentes, este mouse combina precisão extrema e conforto incomparável em um design futurista. "+
      "Com sensor óptico de alta performance e ajuste de DPI, ele garante respostas rápidas e exatas, ideais para qualquer estilo de "+
      "jogo. Sua construção ergonômica proporciona uma pegada firme e confortável, mesmo em longas sessões de uso, reduzindo a fadiga. "+
      "O acabamento metálico sofisticado, com detalhes em tons de prata e preto, aliado à iluminação RGB totalmente customizável, "+
      "cria um visual único e imponente no seu setup.",
      valor: 99.00, quantidade: 27, 
      keywords: ["Mouse Gamer", "Ergônomico", "Ergonomico", "Led", "RGB"]
    },
    {codigo:13, nome:"Memória RAM DDR4 de Alto Desempenho 8gGB",
      descricao:"Essa memória RAM combina um design moderno com iluminação RGB, ideal para quem busca não apenas potência, mas "+
      "também um visual personalizado em seu setup. Com uma construção robusta e otimizada para dissipação de calor, ela garante "+
      "um funcionamento estável e eficiente, mesmo em tarefas de alto desempenho. Perfeita para quem quer desempenho de ponta aliado "+
      "à estética diferenciada.",
      valor: 169.99, quantidade: 15, 
      keywords: ["Memória Ram", "Memoria Ram", "Alto Desempenho", "Alta Performace", "8GB", "DDR4", "LED", "RGB"]
    },
    {codigo:14, nome:"Placa-mãe Xtreme Power de Alta Performace",
      descricao:"Desenvolvida para entusiastas e gamers exigentes, essa placa-mãe traz um design robusto e funcional, perfeita para "+
      "quem busca um desempenho superior. Compatível com os processadores mais recentes, ela oferece múltiplos slots de RAM e uma "+
      "ampla gama de portas de expansão, possibilitando upgrades poderosos e configurações personalizadas. Seu sistema avançado de "+
      "dissipação de calor garante que o desempenho seja mantido em níveis máximos, mesmo durante overclocking e sessões de uso "+
      "prolongado.",
      valor: 755.90, quantidade:83, 
      keywords: ["Placa Mãe", "Placa Mae", "Placa-Mãe", "Placa-Mae","Alta Performace"]        
    },
    {codigo:15, nome:"Placa de Vídeo ThunderX 4K - Potência Gráfica de Última Geração",
      descricao:"A ThunderX 4K foi desenvolvida para gamers e profissionais que precisam de gráficos de alta performance. Com uma "+
      "arquitetura de última geração, essa placa oferece suporte a resoluções 4K e tecnologia de ray tracing, proporcionando uma "+
      "experiência visual incrivelmente detalhada e imersiva, seja em jogos ou aplicações gráficas intensivas. Equipada com uma ampla "+
      "variedade de conectores para monitores modernos, seu design avançado garante refrigeração eficiente, permitindo que o "+
      "desempenho se mantenha constante, mesmo em longas sessões de uso intenso.",
      valor: 1770.90, quantidade: 48, 
      keywords: ["Placa de Vídeo", "Placa de Video", "Alta Performace", "Alto Desempenho", "4K"]
    },
    {codigo:16, nome:"SSD Velocity Pro 1TB - Alta Performance e Armazenamento Seguro",
      descricao:"O SSD Velocity Pro 1TB oferece um desempenho superior, projetado para garantir velocidades de leitura de até "+
      "3500 MB/s e gravação de até 3000 MB/s, otimizando a capacidade de resposta e eficiência do seu sistema. Com capacidade de "+
      "1TB, é perfeito para armazenar grandes volumes de dados com segurança e confiabilidade. Seu design compacto e moderno "+
      "facilita a instalação em computadores e servidores, e sua interface NVMe PCIe 3.0 x4 garante uma conexão rápida e estável. "+
      "Ideal para gamers, profissionais e entusiastas que buscam a melhor performance e tecnologia de última geração.",
      valor: 389.99, quantidade: 37, 
      keywords: ["SSD", "1TB" , "Alta Performace", "Armazenamento Seguro", "Armazenamento Confiável", "Armazenamento Confiavel", "Armazenamento Prático", "Armazenamento Pratico"]
    },
    {codigo:17, nome:"Monitor Curvo UltraWide 34'' - 144Hz e Resolução QHD",
      descricao:"Este monitor curvo de 34 polegadas oferece uma experiência imersiva e confortável, seja para trabalho ou "+
      "entretenimento. Com uma resolução QHD (3440 x 1440 pixels) e taxa de atualização de 144Hz, proporciona imagens nítidas e "+
      "cores vibrantes, otimizando a produtividade e aprimorando a qualidade visual. O design moderno e minimalista, com bordas "+
      "ultrafinas, adiciona elegância ao ambiente e otimiza o espaço de trabalho. A curvatura suave da tela melhora o campo de "+
      "visão, proporcionando uma visualização mais natural e reduzindo a fadiga ocular. Ideal para profissionais e gamers que "+
      "buscam um desempenho visual superior e uma experiência envolvente.",
      valor: 470.30, quantidade:61 ,
      keywords: ["Monitor", "Monitor Curvo", "Pol", "34 Polegada"]
    },
    {codigo:18, nome:"Processador Intel Core i5-11400F 12MB 4.4GHz LGA 1200 - BX8070811400F",
      descricao:"O Intel Core i5-11400F é uma excelente escolha para quem busca desempenho otimizado em jogos, multitarefas e "+
      "atividades que exigem processamento intensivo. Com 6 núcleos e 12 threads, ele oferece potência suficiente para rodar jogos "+
      "de última geração, edição de vídeos e execução de múltiplos aplicativos simultaneamente. Sua velocidade de até 4.4GHz, aliada "+
      "ao cache de 12MB, garante tempos de resposta rápidos e performance estável em tarefas exigentes.Ideal para PCs que utilizam "+
      "placas gráficas dedicadas, o i5-11400F não possui gráficos integrados, o que torna este processador perfeito para gamers e "+
      "criadores de conteúdo que desejam extrair o máximo de sua GPU dedicada. ",
      valor: 659.00, quantidade: 49, 
      keywords: ["Processador Intel Core i5-11400F 12MB 4.4GHz LGA 1200, Alto Desempenho, Alta Performace"] 
    },
    {codigo:19, nome:"SSD Essential 500GB - Armazenamento Confiável e Prático",
      descricao:"O SSD Essential 500GB combina um design elegante em metal escovado com um desempenho satisfatório, projetado para "+
      "proporcionar armazenamento rápido e confiável. Com velocidades de leitura de até 500 MB/s e gravação de até 450 MB/s, ele é "+
      "ideal para melhorar a velocidade de inicialização do sistema, carregar programas e transferir arquivos com agilidade. "+
      "Disponível em várias capacidades, o SSD Essential é uma escolha acessível para quem busca uma solução de armazenamento eficaz "+
      "e com bom custo-benefício, atendendo às necessidades diárias sem comprometer a confiabilidade.",
      valor: 185.99, quantidade: 77,
      keywords: ["SSD", "500GB", "Alta Performace", "Armazenamento Seguro", "Armazenamento Confiável", "Armazenamento Confiavel", "Armazenamento Prático", "Armazenamento Pratico"]
    },
    {codigo:20, nome:"Fonte de Alimentação ATX CV550 - Potência e Eficiência Compactas",
      descricao:"A fonte de alimentação ATX CV550 de 550W é robusta e compacta, projetada para fornecer energia estável e eficiente "+
      "a sistemas de alto desempenho. Com um design modular, ela facilita a instalação e o gerenciamento de cabos, promovendo uma "+
      "experiência organizada e um fluxo de ar otimizado dentro do gabinete. Ideal para gamers e profissionais que exigem "+
      "confiabilidade e eficiência em suas configurações, a CV550 garante que todos os componentes recebam a energia necessária para "+
      "funcionar em seu máximo potencial, mesmo em situações de uso intensivo.",
      valor: 305.90, quantidade: 0,
      keywords: ["Fonte de Alimentação", "Fonte de Alimentaçao", "Fonte de Alimentacão", "Fonte de Alimentacao", "ATX", "550W",  "Alta Eficiência", "Alta Eficiencia"]
    }
  ] 

  public produtosFiltrados: Produto[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filtro = params['q'] || ''
      this.filtrarProdutos()
    })
  }

  public filtrarProdutos() {
    this.produtosFiltrados = this.lista.filter(produto => 
      produto.nome.toLowerCase().includes(this.filtro.toLowerCase()) ||
      produto.keywords.some(keyword => keyword.toLowerCase().includes(this.filtro.toLowerCase()))
    );
    
    this.mensagem = this.produtosFiltrados.length > 0 ? "Nossos Produtos" : "Nenhum Produto Encontrado";
  }

  public verDetalhe(item:Produto) {
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href="./detalhe"
  }
  
  public mostrarModal: boolean = false;
  public mostrarModalCarrinho: boolean = false;
  public produtoSelecionado: Produto | null = null;

  public adicionarCesta(item: Produto) {
    this.produtoSelecionado = item;
    this.mostrarModal = true;
  }

  public confirmarAdicao(obj: Produto | null) {
    if (obj) {
      let cesta = JSON.parse(localStorage.getItem("cesta") || '[]');
      let jsonCliente = localStorage.getItem("cadastro");
      let novaCesta: Cesta = new Cesta();
      let item: Item = new Item();
  
      if (cesta.length === 0) {
        item.codigo = obj.codigo;
        item.produto = obj;
        item.quantidade = 1;
        item.valor = obj.valor;
        novaCesta.codigo = 1;
        novaCesta.total = obj.valor;
        novaCesta.itens.push(item);
        if (jsonCliente != null) novaCesta.cliente = JSON.parse(jsonCliente);
      } else {
        let achou = false;
        novaCesta = cesta;
        for (let i = 0; i < novaCesta.itens.length; i++) {
          if (novaCesta.itens[i].codigo === obj.codigo) {
            novaCesta.itens[i].quantidade += 1;
            novaCesta.itens[i].valor = novaCesta.itens[i].quantidade * novaCesta.itens[i].produto.valor;
            achou = true;
            break;
          }
        }
        if (!achou) {
          item.codigo = obj.codigo;
          item.produto = obj;
          item.quantidade = 1;
          item.valor = obj.valor;
          novaCesta.itens.push(item);
        }
      }
  
      novaCesta.total = novaCesta.itens.reduce((total, it) => total + it.valor, 0);
      localStorage.setItem("cesta", JSON.stringify(novaCesta));
      this.mostrarModalCarrinho = true;
      this.fecharModal();
    }
  }  
  

  public cancelarAdicao() {
    this.fecharModal();
  }

  public fecharModal() {
    this.mostrarModal = false;
    this.produtoSelecionado = null;
  }

  public fecharModalCarrinho() {
    this.mostrarModalCarrinho = false;
  }
}