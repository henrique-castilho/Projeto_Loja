package com.fatec.projeto_loja_back.Controller;

import com.fatec.projeto_loja_back.Entity.Item;
import com.fatec.projeto_loja_back.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    ItemRepository bd;

    @PostMapping("/api/item")
    public void gravar(@RequestBody Item obj){
        bd.save(obj);
    }

    @PostMapping("/api/itensCesta/")
    public void gravarLista(@RequestBody List<Item> obj){
        bd.saveAll(obj);
    }

    @PutMapping("/api/item")
    public void alterar(@RequestBody Item obj){
        bd.save(obj);
    }

    @GetMapping("/api/item/{codigo}")
    public Item carregar(@PathVariable int codigo){
        Optional<Item> obj = bd.findById(codigo);
        if(obj.isPresent()){
            return obj.get();
        } else {
            return null;
        }
    }

    @DeleteMapping("/api/item/{codigo}")
    public void remover(@PathVariable int codigo){
        bd.deleteById(codigo);
    }

    @GetMapping("/api/itens")
    public List<Item> listar(){
        return bd.findAll();
    }
}
