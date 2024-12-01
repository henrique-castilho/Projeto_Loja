package com.fatec.projeto_loja_back.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.projeto_loja_back.Entity.Cliente;
import com.fatec.projeto_loja_back.Repository.ClienteRepository;

@CrossOrigin (origins = "*")
@RestController
public class ClienteController {

    private boolean camposVazios(Cliente obj) {
        return obj.getNome().isEmpty() || obj.getEmail().isEmpty() || obj.getSenha().isEmpty() || obj.getTelefone().isEmpty() || 
               obj.getCpf().isEmpty() || obj.getRg().isEmpty() || obj.getLogradouro().isEmpty() || obj.getCep().isEmpty() || 
               obj.getCidade().isEmpty() || obj.getUf().isEmpty() || obj.getConfirmarSenha().isEmpty();
    }

    private boolean senhasIguais(Cliente obj) {
        return obj.getSenha().equals(obj.getConfirmarSenha());
    }

    @Autowired
    ClienteRepository bd;

    @PostMapping("/api/cliente")
    public Map<String, String> gravar(@RequestBody Cliente obj) {
        if (camposVazios(obj)) {
            return Map.of("mensagem","Todo os campos devem ser preenchidos");
        }

        if (!senhasIguais(obj)) {
            return Map.of("mensagem","A senha e a confirmação da senha devem ser iguais.");
        }

        Optional<Cliente> clienteExistente = bd.findByEmailCpfRg(obj.getEmail(), obj.getCpf(), obj.getRg());
        if (clienteExistente.isPresent()) {
            return Map.of("mensagem","Cliente já cadastrado com as mesmas informações");
        }

        bd.save(obj);
        return Map.of("mensagem", "O cliente " + obj.getNome() + " \nfoi salvo corretamente");
    }

    @PutMapping("/api/cliente")
    public Map<String, String> alterar(@RequestBody Cliente obj){
        if (camposVazios(obj)) {
            return Map.of("mensagem","Todo os campos devem ser preenchidos para realizar a alteração");
        }
        if (!senhasIguais(obj)) {
            return Map.of("mensagem","A senha e a confirmação da senha devem ser iguais.");
        }

        Optional<Cliente> clienteExistente = bd.findById(obj.getCodigo());
        if (!clienteExistente.isPresent()) {
            return Map.of("mensagem","Cliente não encontrado para alteração.");
        }

        Optional<Cliente> clienteExiste = bd.findByEmailCpfRg(obj.getEmail(), obj.getCpf(), obj.getRg());
        if (clienteExiste.isPresent() && clienteExiste.get().getCodigo() != obj.getCodigo()) {
            return Map.of("mensagem", "Cliente já cadastrado com as mesmas informações");
        }

        bd.save(obj);
        return Map.of("mensagem", "O cliente " + obj.getNome() + " \nfoi alterado corretamente.");
    }

    @GetMapping("/api/cliente/{valor}")
    public Cliente carregar(@PathVariable String valor){
        Optional<Cliente> obj = bd.findByCodigoCpfRgEmail(valor);
        if (obj.isPresent()) {
            return obj.get();
        } else {
            return null;
        }
    }

    @DeleteMapping("/api/cliente/{valor}")
    public Map<String, String> remover(@PathVariable String valor) {
        Optional<Cliente> obj = bd.findByCodigoCpfRgEmail(valor);
        if (obj.isPresent()) {
            bd.delete(obj.get());
            return null;
        } else {
            return Map.of("mensagem", "Cliente não encontrado");
        }
    }

    @GetMapping("/api/clientes")
    public List<Cliente> listar(){
        return bd.findAll();
    }

    @PostMapping("/api/cliente/login")
    public Object fazerLogin(@RequestBody Cliente obj) {
        if (obj.getEmail() == null || obj.getEmail().trim().isEmpty() || obj.getSenha() == null || obj.getSenha().trim().isEmpty()) {
            return Map.of("mensagem", "Os campos email e senha são obrigatórios.");
        }
        Optional<Cliente> retorno = bd.login(obj.getEmail(), obj.getSenha());
        if (retorno.isPresent()) {
            return retorno.get();
        } else {
            return Map.of("mensagem", "Usuário ou senha inválidos");
        }
    }

    @PostMapping("/api/cliente/recupera")
    public ResponseEntity<?> recuperarSenha(@RequestBody Cliente obj) {
        Optional<Cliente> retorno = bd.recuperaSenha(obj.getEmail());
        if (retorno.isPresent()) {
            String token = UUID.randomUUID().toString();
            Map<String, String> resposta = new HashMap<>();
            resposta.put("mensagem", "E-mail encontrado. Use o token para redefinir.");
            resposta.put("token", token);
            return ResponseEntity.ok(resposta);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", "E-mail não encontrado."));
        }
    }
    
    @PostMapping("/api/cliente/redefinir")
    public ResponseEntity<?> redefinirSenha(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String novaSenha = dados.get("novaSenha");
        String token = dados.get("token");

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("mensagem", "Token inválido."));
        }

        Optional<Cliente> retorno = bd.recuperaSenha(email);
        if (retorno.isPresent()) {
            Cliente cliente = retorno.get();
            if (cliente.getSenha().equals(novaSenha)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("mensagem", "A nova senha não pode ser a mesma que a atual."));
            }
            cliente.setSenha(novaSenha);
            cliente.setConfirmarSenha(novaSenha);
            bd.save(cliente);
            return ResponseEntity.ok(Map.of("mensagem", "Senha redefinida com sucesso."));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", "E-mail não encontrado."));
        }
    }
}
