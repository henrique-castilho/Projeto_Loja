package com.fatec.projeto_loja_back.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fatec.projeto_loja_back.Entity.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
        
    @Query(value = "SELECT * FROM cliente WHERE email=?1 AND senha=?2", nativeQuery = true)
    Optional<Cliente> login(String email, String senha);

    @Query(value = "SELECT * FROM cliente WHERE email=?1", nativeQuery = true)
    Optional<Cliente> recuperaSenha(String email);
    
    @Query(value = "SELECT * FROM cliente WHERE email = ?1 OR cpf = ?2 OR rg = ?3", nativeQuery = true)
    Optional<Cliente> findByEmailCpfRg(String email, String cpf, String rg);
}
