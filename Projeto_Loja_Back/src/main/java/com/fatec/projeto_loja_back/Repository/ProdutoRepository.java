package com.fatec.projeto_loja_back.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.fatec.projeto_loja_back.Entity.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    @Query(value = "SELECT * FROM produto WHERE destaque > 0", nativeQuery = true)
    List<Produto> listarVitrine();

    @Query(value = "SELECT * FROM produto WHERE keywords LIKE %:palavraChave%", nativeQuery = true)
    List<Produto> fazerBusca(@Param("palavraChave") String palavraChave);
    
}