package com.fatec.projeto_loja_back.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Cesta {
    @Id
    private int codigo;
    @ManyToOne
    @JoinColumn(name = "cliente_codigo")
    private Cliente cliente = new Cliente();
    private double total;
    @OneToMany(mappedBy = "cesta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> itens = new ArrayList<>();


    public Cesta(int codigo, Cliente cliente, double total, List<Item> itens) {
        this.codigo = codigo;
        this.cliente = cliente;
        this.total = total;
        this.itens = itens;
    }

    public Cesta(){}


    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<Item> getItens() {
        return itens;
    }

    public void setItens(List<Item> itens) {
        this.itens = itens;
    }
}

