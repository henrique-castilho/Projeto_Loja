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
    {codigo:1, nome:"Gabinete Gamer SuperFrame Super X", 
      descricao:"O gabinete gamer Super X da Superframe é uma opção de alto desempenho, com design Mid tower e painel frontal em vidro " + 
      "temperado, permitindo exibir os componentes internos. Possui um design aerodinâmico que otimiza o fluxo de ar, mantendo o" +  
      "sistema resfriado e garantindo o máximo desempenho. Ideal para quem busca qualidade e funcionalidade em um setup gamer.", 
      valor: 249.90, quantidade: 35, keywords: "Gabinete"
    },
    {codigo:2, nome:"Monitor Gamer SuperFrame Precision, 23.6 Pol", 
      descricao:"Os monitores SuperFrame oferecem excelente desempenho com gráficos fluidos e alta qualidade." + 
      "Eles possuem tela curva, Full HD, painel VA, taxa de atualização de 180Hz, tempo de resposta de 1ms e tecnologia FreeSync, " +
      "proporcionando uma experiência visual surpreendente.",
      valor: 699.90, quantidade: 25, keywords: "Monitor"
    },
    {codigo:3, nome:"Teclado Gamer Mecânico Redragon Lakshmi",
      descricao:"O Redragon LAKSHMI é um teclado projetado para performance profissional, evitando double clicks e oferecendo o dobro " + 
      "da vida útil em comparação a teclados mecânicos convencionais. É a escolha ideal para quem busca um upgrade de qualidade para " + 
      "seu setup.",
      valor: 149.90, quantidade: 10, keywords: "Teclado"
    },
    {codigo:4, nome:"Mouse Gamer Redragon Cobra V2 RGB", 
      descricao:" O mouse gamer profissional Cobra V2 da Redragon possui 12400 DPI, 8 Botões Programáveis, Black, M711 V2." +
      "Combina a popular iluminação Chroma Mark II com conforto e precisão. Oferece opções de personalização da iluminação através " + 
      "do software Redragon,  permitindo que você ajuste o mouse ao seu estilo.",
      valor: 99.90, quantidade: 20, keywords: "Mouse"
    },
    {codigo:5, nome:"Fonte MSI MAG A650BN", 
      descricao:"A fonte de alimentação MAG A650BN é uma opção segura, confiável e eficiente para gamers. Com certificação 80 PLUS " + 
      "Bronze, design de circuito DC para DC, trilho único de 12V, PFC ativo e ventoinha de baixo ruído, ela é ideal para quem " + 
      "está começando. Após a instalação, proporciona um desempenho confiável sem necessidade de configurações adicionais.",
      valor: 299.90, quantidade: 45, keywords: "Fonte"
    },
    {codigo:6, nome:"Placa Mãe Gigabyte B550M AORUS Elite", 
      descricao:"AMD B550 Ultra Durable Motherboard com Pure Digital VRM Solution, PCIe 4.0 x16 Slot,"+ 
      "Dual PCIe 4.0 / 3.0 M.2 Conectores, GIGABYTE 8118 Gaming LAN, Smart Fan 5 com FAN STOP, RGB FUSION 2.0, Q-Flash Plus",
      valor: 819.99, quantidade: 55, keywords : "Placa Mae"  
    },
    {codigo:7, nome:"Processador AMD Ryzen 7 5700X3D",
      descricao:"O Ryzen 7 5700X3D conta com 8 núcleos incríveis para quem quer apenas jogar. Os processadores AMD Ryzen série 5000 " + 
      "capacitam a próxima geração de jogos exigentes," + "proporcionando experiências imersivas únicas e dominando qualquer tarefa " + 
      "multithread como 3D e renderização de vídeo e compilação de software.",
      valor: 1399.90, quantidade: 50, keywords: "Procesador"
    },
    {codigo:8, nome:"Memória DDR4 Kingston Fury Beast, RGB, 16GB", 
      descricao:"A Kingston FURY Beast DDR4 RGB oferece alta performance com velocidades de até 3733MHz0, luzes RGB, e está disponível " +
      "em capacidades de modulo único de 8GB a 32GB e capacidade de kit  de 16GB a 128GB e latências CL15-19." + 
      "Suporta overclock automático Plug and Play a 2666MHz, além de ser compatível com Intel XMP e AMD Ryzen™." +
      "Possui dissipador de calor de perfil baixo e é testada em velocidade, com garantia vitalícia.",
      valor:  289.99, quantidade: 40, keywords: "Memoria Ram"
    },
    {codigo:9, nome:"SSD Kingston NV2, 500GB", descricao:"O NV2 PCIe 4.0 NVMe SSD da Kingston é um SSD de alto desempenho com "+ 
      "controlador NVMe Gen 4x4, oferecendo velocidades de leitura/gravação de até 3.500/2.100MB/s. Ele possui baixo consumo de energia " + 
      "e menor aquecimento, otimizando o desempenho do sistema sem comprometer o custo-benefício.",
      valor: 288.90, quantidade: 30, keywords: "SSD"
    },
    {codigo:10, nome:"Placa de Vídeo Gigabyte NVIDIA GeForce RTX 4060",
      descricao:"A NVIDIA GeForce RTX 4060 oferece alto desempenho com suporte a ray tracing e gráficos com inteligência artificial, " + 
      "ideal para gamers e criadores. Alimentada pela arquitetura NVIDIA Ada Lovelace, vem com até 8 GB de memória G6 ultrarrápida " +
      "para entregar uma experiência otimizada em jogos e projetos criativos.",
      valor: 1969.90, quantidade: 0, keywords: "Placa de Video"
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
      produto.keywords.toLowerCase().includes(this.filtro.toLowerCase())
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