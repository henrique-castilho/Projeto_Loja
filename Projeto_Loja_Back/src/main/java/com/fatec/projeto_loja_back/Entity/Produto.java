package com.fatec.projeto_loja_back.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int codigo;
    private String nome;
    private String descricao;
    private double valor;
    private int quantidade;
    private String keywords;
    private int destaque = 0;

    public Produto(){}

    public int getCodigo() {
        return codigo;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getValor() {
        return valor;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public String getKeywords() {
        return keywords;
    }

    public int getDestaque() {
        return destaque;
    }
}

