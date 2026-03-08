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

import com.projeto.sale.DTO.fornecedor.DadosAlterarFornecedorDTO;
import com.projeto.sale.DTO.fornecedor.DadosCadastroFornecedorDTO;
import com.projeto.sale.DTO.fornecedor.DadosDetalhamentoFornecedorDTO;
import com.projeto.sale.service.FornecedorService;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

	@Autowired
	private FornecedorService fornecedorService;

	@PostMapping("/cadastrar")
	public ResponseEntity<DadosCadastroFornecedorDTO> cadastrar(
			@RequestBody @Validated DadosCadastroFornecedorDTO dados) {
		var fornecedor = fornecedorService.cadastrar(dados);

		return ResponseEntity.ok(new DadosCadastroFornecedorDTO(fornecedor.getNome(), fornecedor.getCnpj(),
				fornecedor.getContato(), fornecedor.getCidade()));
	}

	@PutMapping("/alterar/{id}")
	public ResponseEntity<DadosDetalhamentoFornecedorDTO> alterar(@PathVariable Long id,
			@RequestBody @Validated DadosAlterarFornecedorDTO dados) throws Exception {
		var fornecedor = fornecedorService.alterar(id, dados);

		return ResponseEntity.ok(new DadosDetalhamentoFornecedorDTO(id, fornecedor.nome(), fornecedor.cnpj(),
				fornecedor.contato(), fornecedor.cidade()));
	}
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		fornecedorService.deletar(id);
	}
	
	@GetMapping("/listar")
	public ResponseEntity<List<DadosDetalhamentoFornecedorDTO>> listar(){
		var lista = fornecedorService.listar();
		
		return ResponseEntity.ok(lista);
	}
}
