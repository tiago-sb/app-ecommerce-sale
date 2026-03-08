package com.projeto.sale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.sale.DTO.cliente.DadosAlterarClienteDTO;
import com.projeto.sale.DTO.cliente.DadosCadastrarClienteDTO;
import com.projeto.sale.DTO.cliente.DadosDetalhamentoClienteDTO;
import com.projeto.sale.service.ClienteService;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

	@Autowired
	private ClienteService clienteService;

	@PostMapping("/cadastrar")
	public ResponseEntity<DadosDetalhamentoClienteDTO> cadastrar(
			@RequestBody @Validated DadosCadastrarClienteDTO dados) {
		var cliente = clienteService.cadastrar(dados);

		var resposta = new DadosDetalhamentoClienteDTO(cliente.getId(), cliente.getNome(), cliente.getCpf(),
				cliente.getEmail(), cliente.getTelefone(), cliente.getCidade());

		return ResponseEntity.ok(resposta);
	}

	@PutMapping("/alterar/{id}")
	public ResponseEntity<DadosDetalhamentoClienteDTO> alterar(@PathVariable Long id,
			@RequestBody @Validated DadosAlterarClienteDTO dados) throws Exception {
		var cliente = clienteService.alterar(id, dados);

		return ResponseEntity.ok(cliente);
	}
	
	@DeleteMapping("/deletar/{id}")
	public ResponseEntity<DadosDetalhamentoClienteDTO> deletar(@PathVariable Long id) {
		clienteService.deletar(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/listar")
	public ResponseEntity<List<DadosDetalhamentoClienteDTO>> listar(){
		var lista = clienteService.listar();
		
		return ResponseEntity.ok(lista); 
	}
}
