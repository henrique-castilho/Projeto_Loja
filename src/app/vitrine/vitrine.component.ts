import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})

export class VitrineComponent {
  public mensagem: string = "Nossos Produtos";
  public lista: Produto[] = [
    {codigo:1, nome:"Gabinete Gamer SuperFrame Super X", 
      descricao:"O gabinete gamer Super X da Superframe é uma opção de alto desempenho, com design Mid tower e painel frontal em vidro " + 
      "temperado, permitindo exibir os componentes internos. Possui um design aerodinâmico que otimiza o fluxo de ar, mantendo o" +  
      "sistema resfriado e garantindo o máximo desempenho. Ideal para quem busca qualidade e funcionalidade em um setup gamer.", 
      valor: 249.90, quantidade: 10, keywords: "Gabinete"
    },
    {codigo:2, nome:"Monitor Gamer SuperFrame Precision, 23.6 Pol", 
      descricao:"Os monitores SuperFrame oferecem excelente desempenho com gráficos fluidos e alta qualidade." + 
      "Eles possuem tela curva, Full HD, painel VA, taxa de atualização de 180Hz, tempo de resposta de 1ms e tecnologia FreeSync, " +
      "proporcionando uma experiência visual surpreendente.",
      valor: 699.90, quantidade: 10, keywords: "Monitor"
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
      valor: 99.90, quantidade: 10, keywords: "Mouse"
    },
    {codigo:5, nome:"Fonte MSI MAG A650BN", 
      descricao:"A fonte de alimentação MAG A650BN é uma opção segura, confiável e eficiente para gamers. Com certificação 80 PLUS " + 
      "Bronze, design de circuito DC para DC, trilho único de 12V, PFC ativo e ventoinha de baixo ruído, ela é ideal para quem " + 
      "está começando. Após a instalação, proporciona um desempenho confiável sem necessidade de configurações adicionais.",
      valor: 299.90, quantidade: 10, keywords: "Fonte"
    },
    {codigo:6, nome:"Placa Mãe Gigabyte B550M AORUS Elite", 
      descricao:"AMD B550 Ultra Durable Motherboard com Pure Digital VRM Solution, PCIe 4.0 x16 Slot,"+ 
      "Dual PCIe 4.0 / 3.0 M.2 Conectores, GIGABYTE 8118 Gaming LAN, Smart Fan 5 com FAN STOP, RGB FUSION 2.0, Q-Flash Plus",
      valor: 819.99, quantidade: 10, keywords : "Placa Mae"  
    },
    {codigo:7, nome:"Processador AMD Ryzen 7 5700X3D",
      descricao:"O Ryzen 7 5700X3D conta com 8 núcleos incríveis para quem quer apenas jogar. Os processadores AMD Ryzen série 5000 " + 
      "capacitam a próxima geração de jogos exigentes," + "proporcionando experiências imersivas únicas e dominando qualquer tarefa " + 
      "multithread como 3D e renderização de vídeo e compilação de software.",
      valor: 1399.90, quantidade: 10, keywords: "Procesador"
    },
    {codigo:8, nome:"Memória DDR4 Kingston Fury Beast, RGB, 16GB", 
      descricao:"A Kingston FURY Beast DDR4 RGB oferece alta performance com velocidades de até 3733MHz0, luzes RGB, e está disponível " +
      "em capacidades de modulo único de 8GB a 32GB e capacidade de kit  de 16GB a 128GB e latências CL15-19." + 
      "Suporta overclock automático Plug and Play a 2666MHz, além de ser compatível com Intel XMP e AMD Ryzen™." +
      "Possui dissipador de calor de perfil baixo e é testada em velocidade, com garantia vitalícia.",
      valor:  289.99, quantidade: 10, keywords: "Memoria Ram"
    },
    {codigo:9, nome:"SSD Kingston NV2, 500GB", descricao:"O NV2 PCIe 4.0 NVMe SSD da Kingston é um SSD de alto desempenho com "+ 
      "controlador NVMe Gen 4x4, oferecendo velocidades de leitura/gravação de até 3.500/2.100MB/s. Ele possui baixo consumo de energia " + 
      "e menor aquecimento, otimizando o desempenho do sistema sem comprometer o custo-benefício.",
      valor: 288.90, quantidade: 10, keywords: "SSD"
    },
    {codigo:10, nome:"Placa de Vídeo Gigabyte NVIDIA GeForce RTX 4060",
      descricao:"A NVIDIA GeForce RTX 4060 oferece alto desempenho com suporte a ray tracing e gráficos com inteligência artificial, " + 
      "ideal para gamers e criadores. Alimentada pela arquitetura NVIDIA Ada Lovelace, vem com até 8 GB de memória G6 ultrarrápida " +
      "para entregar uma experiência otimizada em jogos e projetos criativos.",
      valor: 1969.90, quantidade: 10, keywords: "Placa de Video"
    }
  ]

  public verDetalhe(item:Produto) {
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href="./detalhe";
  }
  
  public mostrarModal: boolean = false;
  public mostrarModalCarrinho: boolean = false;
  public produtoSelecionado: Produto | null = null;

  public adicionarCesta(item: Produto) {
    this.produtoSelecionado = item;
    this.mostrarModal = true;
  }

  public confirmarAdicao() {
    if (this.produtoSelecionado) {
      let cesta = JSON.parse(localStorage.getItem("cesta") || '[]');
      cesta.push(this.produtoSelecionado);
      localStorage.setItem("cesta", JSON.stringify(cesta));
      this.fecharModal(); 

      this.mostrarModalCarrinho = true;
    }
  }

  public cancelarAdicao() {
    console.log("Ação cancelada pelo usuário.");
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