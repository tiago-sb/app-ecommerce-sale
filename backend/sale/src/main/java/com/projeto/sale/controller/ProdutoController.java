package com.projeto.sale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.sale.DTO.produto.DadosAtualizacaoProdutoDTO;
import com.projeto.sale.DTO.produto.DadosCadastroProdutoDTO;
import com.projeto.sale.DTO.produto.DadosDetalhamentoProdutoDTO;
import com.projeto.sale.DTO.produto.DadosDetalhamentoProdutoTotalDTO;
import com.projeto.sale.service.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;

	@PostMapping("/cadastrar")
	public ResponseEntity<DadosDetalhamentoProdutoDTO> cadastrar(@RequestBody @Validated DadosCadastroProdutoDTO dados) {

		var produto = produtoService.cadastrar(dados);

		return ResponseEntity.status(HttpStatus.CREATED).body(new DadosDetalhamentoProdutoDTO(produto.getId(),
				produto.getNome(), produto.getPrecoCusto(), produto.getPrecoVenda()));
	} 
	
	@PutMapping("/alterar/{id}")
	public ResponseEntity<DadosDetalhamentoProdutoDTO> alterar(@PathVariable Long id,
			@RequestBody @Validated DadosAtualizacaoProdutoDTO dados) throws Exception {

		var produtoAtualizado = produtoService.alterar(id, dados);

		return ResponseEntity.ok(produtoAtualizado);
	}
	
	@DeleteMapping("/deletar/{id}")
	public ResponseEntity<DadosDetalhamentoProdutoDTO> deletar(@PathVariable Long id){
		produtoService.deletar(id);

	    return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/listar")
	public ResponseEntity<List<DadosDetalhamentoProdutoTotalDTO>> listar(){
		var produtos = produtoService.listar();
		
		return ResponseEntity.ok(produtos);
	}
	
	@GetMapping("/buscar")
	public ResponseEntity<List<DadosCadastroProdutoDTO>> buscar(@RequestParam String nome){
	    var produtos = produtoService.buscarPorNome(nome);
	    
	    return ResponseEntity.ok(produtos);
	}
	
	@GetMapping("/total")
	public Integer totalEstoque() {
		return produtoService.totalEstoque();
	}
	
	@GetMapping("/estoque_baixo")
	public Integer estoqueBaixo() {
		return produtoService.estoqueMínimo();
	}
}
