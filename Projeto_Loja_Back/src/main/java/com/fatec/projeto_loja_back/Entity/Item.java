package com.fatec.projeto_loja_back.Entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;

// @Entity
public class Item {
    // @Id
    private int codigo;
    private Produto produto = new Produto();
    private int quantidade;
    private double valor;
    

    public Item(int codigo, Produto produto, int quantidade, double valor) {
        this.codigo = codigo;
        this.produto = produto;
        this.quantidade = quantidade;
        this.valor = valor;
    }

    public Item() {}

    public int getCodigo() {
        return codigo;
    }
    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }
    public Produto getProduto() {
        return produto;
    }
    public void setProduto(Produto produto) {
        this.produto = produto;
    }
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    public double getValor() {
        return valor;
    }
    public void setValor(double valor) {
        this.valor = valor;
    }
}

