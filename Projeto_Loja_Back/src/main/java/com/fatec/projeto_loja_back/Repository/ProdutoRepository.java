package com.fatec.projeto_loja_back.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fatec.projeto_loja_back.Entity.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    @Query(value = "SELECT * FROM produto WHERE destaque > 0 ORDER BY destaque DESC", nativeQuery = true)
    List<Produto> listarVitrine();

    @Query(value = "SELECT DISTINCT p.* FROM produto p " +
    "JOIN produto_keywords pk ON pk.produto_codigo = p.codigo " +
    "WHERE pk.keywords LIKE %?1% " +
    "ORDER BY p.nome", nativeQuery = true)
    List<Produto> fazerBusca(String palavraChave);

    @Query(value = "SELECT * FROM produto WHERE nome = ?1", nativeQuery = true)
    Optional<Produto> findByNome(String nome); 

    @Query(value = "SELECT * FROM produto WHERE codigo = ?1 OR nome = ?1", nativeQuery = true)
    Optional<Produto> findByCodigoNome(String valor);    
}