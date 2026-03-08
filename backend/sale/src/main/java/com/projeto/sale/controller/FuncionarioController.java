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

import com.projeto.sale.DTO.funcionario.DadosAlterarFuncionarioDTO;
import com.projeto.sale.DTO.funcionario.DadosCadastrarFuncionarioDTO;
import com.projeto.sale.DTO.funcionario.DadosDetalhamentoFuncionarioDTO;
import com.projeto.sale.service.FuncionarioService;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

	@Autowired
	private FuncionarioService funcionarioService;

	@PostMapping("/cadastrar")
	public ResponseEntity<DadosDetalhamentoFuncionarioDTO> cadastrar(
			@RequestBody @Validated DadosCadastrarFuncionarioDTO dados) {
		var funcionario = funcionarioService.cadastrar(dados);

		var resposta = new DadosDetalhamentoFuncionarioDTO(funcionario.getId(), funcionario.getNome(),
				funcionario.getCpf(), funcionario.getFuncao(), funcionario.getPerfil());

		return ResponseEntity.ok(resposta);
	}

	@PutMapping("/alterar/{id}")
	public ResponseEntity<DadosDetalhamentoFuncionarioDTO> alterar(@PathVariable Long id,
			@RequestBody @Validated DadosAlterarFuncionarioDTO dados) throws Exception {
		var funcionario = funcionarioService.alterar(id, dados);

		return ResponseEntity.ok(funcionario);
	}

	@DeleteMapping("/deletar/{id}")
	public ResponseEntity<DadosDetalhamentoFuncionarioDTO> deletar(@PathVariable Long id) {
		funcionarioService.deletar(id);

		return ResponseEntity.noContent().build();
	}

	@GetMapping("/listar")
	public ResponseEntity<List<DadosDetalhamentoFuncionarioDTO>> listar() {
		var lista = funcionarioService.listar();
		
		return ResponseEntity.ok(lista);
	}
}
