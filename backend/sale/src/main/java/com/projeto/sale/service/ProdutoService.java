package com.projeto.sale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.sale.DTO.produto.DadosAtualizacaoProdutoDTO;
import com.projeto.sale.DTO.produto.DadosCadastroProdutoDTO;
import com.projeto.sale.DTO.produto.DadosDetalhamentoProdutoDTO;
import com.projeto.sale.DTO.produto.DadosDetalhamentoProdutoTotalDTO;
import com.projeto.sale.model.Produto;
import com.projeto.sale.repository.ProdutoRepository;

import jakarta.transaction.Transactional;

@Service
public class ProdutoService {
	@Autowired
	private ProdutoRepository produtoRepository;

	@Transactional
	public Produto cadastrar(DadosCadastroProdutoDTO dados) {
		if (produtoRepository.existsByNome(dados.nome())) {
			throw new IllegalArgumentException("Usuário Cadastrado.");
		}

		var produto = new Produto();

		produto.setNome(dados.nome());
		produto.setUnidade(dados.unidade());
		produto.setEstoqueMinimo(dados.estoqueMinimo());
		produto.setEstoqueAtual(dados.estoqueAtual());
		produto.setPrecoCusto(dados.precoCusto());
		produto.setPrecoVenda(dados.precoVenda());

		return produtoRepository.save(produto);
	}

	@Transactional
	public DadosDetalhamentoProdutoDTO alterar(Long id, DadosAtualizacaoProdutoDTO dados) throws Exception {
		var produto = produtoRepository.findById(id).orElseThrow(() -> new Exception("Estado não encontrado"));

		produto.setNome(dados.nome());
		produto.setUnidade(dados.unidade());
		produto.setEstoqueMinimo(dados.estoqueMinimo());
		produto.setEstoqueAtual(dados.estoqueAtual());
		produto.setPrecoCusto(dados.precoCusto());
		produto.setPrecoVenda(dados.precoVenda());

		return new DadosDetalhamentoProdutoDTO(produto.getId(), produto.getNome(), produto.getPrecoCusto(),
				produto.getPrecoVenda());
	}
	
	@Transactional
	public void deletar(Long id) {
		if(!produtoRepository.existsById(id)) {
			throw new RuntimeException("Estado não Encontrado");
		}
		
		produtoRepository.deleteById(id);
	}
	
	@Transactional
	public List<DadosDetalhamentoProdutoTotalDTO> listar(){
		return produtoRepository.findAll()
				.stream()
	            .map(produto -> new DadosDetalhamentoProdutoTotalDTO(
	            		produto.getId(),
	            		produto.getNome(), 
	            		produto.getUnidade(), 
	            		produto.getEstoqueMinimo(), 
	            		produto.getEstoqueAtual(),
	            		produto.getPrecoCusto(), 
	            		produto.getPrecoVenda()
	            ))
	            .toList();
	}
	
	@Transactional
	public List<DadosCadastroProdutoDTO> buscarPorNome(String nome){
	    return produtoRepository.findByNomeContainingIgnoreCase(nome)
	            .stream()
	            .map(produto -> new DadosCadastroProdutoDTO(
	            		produto.getNome(), 
	            		produto.getUnidade(), 
	            		produto.getEstoqueMinimo(), 
	            		produto.getEstoqueAtual(),
	            		produto.getPrecoCusto(), 
	            		produto.getPrecoVenda()
	            ))
	            .toList();
	}
	
	@Transactional
	public Integer totalEstoque() {
		var total = produtoRepository.totalEstoque();  
		
		return total != null ? total : 0; 
	}
	
	@Transactional
	public Integer estoqueMínimo() {
		var estoqueMinimo = produtoRepository.estoqueBaixo();
		
		return estoqueMinimo != null ? estoqueMinimo : 0;
	}
}
