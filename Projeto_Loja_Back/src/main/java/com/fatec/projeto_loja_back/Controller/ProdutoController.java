package com.fatec.projeto_loja_back.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.projeto_loja_back.Entity.Produto;
import com.fatec.projeto_loja_back.Repository.ProdutoRepository;

@CrossOrigin(origins = "*")
@RestController
public class ProdutoController {
    public boolean camposVazios(Produto obj) {
        if (obj.getNome() == null || obj.getNome().trim().isEmpty()) {
            return true;
        }
        if (obj.getDescricao() == null || obj.getDescricao().trim().isEmpty()) {
            return true;
        }
        if (obj.getKeywords() == null || obj.getKeywords().trim().isEmpty()) {
            return true;
        }
        if (obj.getValor() < 0) {
            return true;
        }
        if (obj.getQuantidade() < 0) {
            return true;
        }
        if (obj.getDestaque() < 0) {
            return true;
        }
        return false;
    }
    
    @Autowired
    ProdutoRepository bd;

    @PostMapping("/api/produto")
    public Map<String, String> gravar(@RequestBody Produto obj) {
        if (camposVazios(obj)) {
            return Map.of("mensagem","Erro: Todo os campos devem ser preenchidos e com valores válidos");
        }
        bd.save(obj);
        return Map.of("mensagem", "O produto " + obj.getNome() + "foi salvo corretamente");
    }

    @PutMapping("/api/produto")
    public Map<String, String> alterar(@RequestBody Produto obj) {
        if (camposVazios(obj)) {
            return Map.of("mensagem","Erro: Todo os campos devem ser preenchidos e com valores válidos");
        }
        bd.save(obj);
        return Map.of("mensagem","O produto " + obj.getNome() + " foi alterado corretamente");
    }

    @GetMapping("/api/produto/{codigo}")
    public Produto carregar(@PathVariable int codigo) {
        Optional<Produto> obj = bd.findById(codigo);
        if (obj.isPresent()) {
            return obj.get();
        } else {
            return null;
        }
    }

     @DeleteMapping("/api/produto/{codigo}")
    public Map<String, String> remover(@PathVariable int codigo) {
        if (bd.existsById(codigo)) {
            bd.deleteById(codigo);
            return null;
        } else {
            return Map.of("mensagem","Produto não encontrado");
        }
    }

    @GetMapping("/api/produtos")
    public List<Produto> listar() {
        return bd.findAll();
    }

    @GetMapping("/api/produto/vitrine")
    public List<Produto> listarVitrine() {
        return bd.listarVitrine();
    }

    @GetMapping("/api/produto/busca/{palavraChave}")
    public List<Produto> fazerBusca(@PathVariable String palavraChave) {
        return bd.fazerBusca("%" + palavraChave + "%");
    }
   
}
