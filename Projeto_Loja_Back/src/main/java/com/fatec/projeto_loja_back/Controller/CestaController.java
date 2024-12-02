package com.fatec.projeto_loja_back.Controller;

import com.fatec.projeto_loja_back.Entity.Cesta;
import com.fatec.projeto_loja_back.Entity.Cliente;
import com.fatec.projeto_loja_back.Repository.CestaRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class CestaController {
    @Autowired
    CestaRepository bd;

    @PostMapping("/api/cesta")
    public Cesta gravar(@RequestBody Cesta obj) {
        if (obj.getCliente() != null && obj.getCliente().getCodigo() != 0) {
            obj.setCodigoCliente();
        } else {
            throw new IllegalArgumentException("Código do cliente inválido");
        }
        int maxCodigo = bd.codMaximo();
        int novoCodigo = maxCodigo + 1;
        obj.setCodigo(novoCodigo);

        Cesta cesta = bd.save(obj);
        return cesta;
    }

    @PutMapping("/api/cesta")
    public void alterar(@RequestBody Cesta obj) {
        bd.save(obj);
    }

    @GetMapping("/api/cesta/{codigo}")
    public Cesta carregar(@PathVariable int codigo) {
        Optional<Cesta> obj = bd.findById(codigo);
        if (obj.isPresent()) {
            return obj.get();
        } else {
            Cesta c1 = new Cesta();
            c1.setCliente(new Cliente());
            c1.setItens(new HashSet<>());
            return c1;
        }
    }

    @DeleteMapping("/api/cesta/{codigo}")
    public void remover(@PathVariable int codigo) {
        bd.deleteById(codigo);
    }

    @GetMapping("/api/cestas")
    public List<Cesta> listar() {
        return bd.findAll();
    }
}